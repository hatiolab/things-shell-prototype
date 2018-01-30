import '@polymer/polymer/polymer.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';

import scene from '@hatiolab/things-scene';

import { ReduxMixin } from '../../reducer/redux-mixin';

class ThingsProvider extends ReduxMixin(PolymerElement) {

  static get template() {
    return html`
    `;
  }

  static get properties() {
    return {
      /**
       * 프로바이더 모드 - P (Polling) or S (Subscribe)
       */
      providerMode: {
        type: Object,
        value: {}
      },

      pollingInterval: {
        type: Object,
        value: {}
      },

      boardName: String,
      boardVersion: Number,

      refProvider: {
        notify: true
      },

      _asyncPlayer: {
        type: Object,
        value: {}
      }
    }
  }

  ready() {
    var self = this;
    this.requests = [];
    this.names = {};
    this.subscribers = {};

    this.refProvider = new scene.ReferenceMap(
      // Reference Creator
      function (boardName, resolve, reject) {

        var xhr = new XMLHttpRequest();

        // 프로바이더에서 처음 제공하는 경우에는 provider 자신에게 설정된 버전을 적용한다.
        // 프로바이더 인터페이스가 버전 개념이 없기 때문에, 편법으로 적용한 방법이다.
        var boardVersion = self.refProvider.ids.length === 0 && self.boardVersion
        var url = self.globals.baseUrl + '/scenes/' + boardName + (boardVersion ? '/' + boardVersion : '')

        xhr.onloadend = done;
        xhr.ontimeout = timeout;
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.timeout = 30000;
        xhr.open('GET', url, true);
        xhr.send();

        function done(e) {
          var xhr = e.target;

          if (xhr.status !== 200) {
            if (xhr.status == 401)
              self.handleUnauthorized();
            else
              self.openResponseError(xhr.response);

            reject('cannot fetch resource: ' + boardName + ', status: ' + xhr.status);
            return
          }

          var info = e.target.response

          if (!info) {
            reject('cannot fetch resource: ' + boardName + ', status: ' + xhr.status);
            return
          }

          self.refProvider.get(info.name)
            .then(function (s) {
              resolve(s, info);
              console.warn("Board fetched more than twice.", info.name)
            }, function (e) {

              var s = scene.create({
                model: JSON.parse(info.model),
                mode: 0,
                refProvider: self.refProvider
              });

              s.app.baseUrl = self.globals.baseUrl

              var name = info.name
              self.names[name] = s

              if (self.subscriberClient)
                self._subscribe(name)

              self.requestBindingData(name);

              resolve(s, info)
            })
        }

        function timeout() {
          reject('Timeout occured while fetching board: ' + boardName)
        }
      },

      // Reference Disposer
      function (id, ref) {
        var boardName;
        for (let name in self.names) {
          if (self.names[name] !== ref)
            continue
          boardName = name
          if (self.subscriberClient) {
            self.subscribers[name] && self.subscribers[name].unsubscribe()
            delete self.subscribers[name]
          }
        }

        delete self.names[boardName]

        // subscriber가 남아있지 않으면 subscribing 또는 polling을 중단한다.
        self.async(function () {
          ref.dispose();
          if (Object.keys(self.subscribers).length === 0) {
            if (!self.providerMode[boardName] || self.providerMode[boardName] == 'S') {
              self._stopSubscribing(boardName);
            } else {
              self._stopPolling(boardName);
            }
          }
        }, 10)
      }
    )
  }

  // TODO reference provider에서 variable subscribing 기능을 담당해야 한다.
  static get listeners() {
    return {
      'ajax-init-data.response': "onResponseInitData"
    }
  }

  static get observers() {
    return [
      'onBaseUrlChanged(globals.baseUrl)'
    ]
  }

  onBaseUrlChanged(after, before) {
    this.refProvider && this.refProvider.ids.forEach(id => {
      this.refProvider.get(id)
        .then(function (scene) {
          if (!scene) {
            console.error("BUG")
            return
          }

          scene.app.baseUrl = after
          scene.release()
        })
    })
  }

  /**
   * Binding Data를 요청한다.
   */
  requestBindingData(name) {
    var ajax = this.$['ajax-init-data'];
    ajax.withCredentials = false; // TODO ?
    ajax.url = this.globals.baseUrl + `/publishers/${name}/init_data`
    ajax.generateRequest()
  }

  onResponseInitData(e, xhr) {
    var values = xhr.response;
    var boardName = values["scene-names"]
    var scene = this.names[boardName]

    // 응답이 오기전에 다른 Route로 이동한 경우 등
    if (!scene)
      return

    this.providerMode[boardName] = values["provider-mode"] ? values["provider-mode"] : 'P';

    if (this.providerMode[boardName] == 'S') {
      this._startSubscribing();
    }

    if (this.providerMode[boardName] == 'P') {
      var interval = values["polling-interval"] ? values["polling-interval"] : '10000';
      this.pollingInterval[boardName] = Number(interval);
      this.beforeBoardName = boardName;
      this._startPolling(boardName);
    }

    if (!values.variables)
      return

    scene.data = values.variables;
  }

  onAjaxError(e, detail) {
    var response = detail.request.xhr.response;

    if (response && response.status == 401) {
      this.handleUnauthorized();
    } else {
      if (this.beforeBoardName) {
        // 요청이 오기전에 다른 Route로 이동한 경우
        var scene = this.names[this.beforeBoardName]
        if (!scene) {
          return
        }
        // 현재 라우터에서 전에 polling한적이 있는 경우
        this._startPolling(this.beforeBoardName);
      }
      this.openResponseError(response);
    }
  }

  _subscribe(name) {
    var client = this.subscriberClient
    var subject = this.subscriberSubject
    var self = this

    this.subscribers[name] = client.subscribe(subject + '/' + name, function (message) {
      var variables = JSON.parse(message.body);

      if (!variables)
        return

      var scene = self.names[name]

      // 요청이 오기전에 다른 Route로 이동한 경우
      if (!scene)
        return

      if (variables instanceof Array)
        variables.forEach(variable => scene.data = variable)
      else
        scene.data = variables;
    });
  }

  _onSubscriberConnected(event) {
    this.subscriberClient = event.detail.client;
    this.subscriberSubject = event.detail.subject;

    if (!this.subscriberClient)
      return

    for (let name in this.names)
      this._subscribe(name)
  }

  // TODO subscriber가 끊기는 경우에 대한 대응.
  _onSubscriberDisconnected(event) {
    delete this.subscriberClient
    delete this.subscriberSubject
  }

  /**
   * Start Subscribing
   */
  _startSubscribing() {
    if (this.refProvider.ids.length > 0 && !this.$['data-subscriber']._isStarted) {
      this.$['data-subscriber'].start()
    }
  }

  /**
   * Start Polling
   */
  _startPolling(boardName) {
    this._asyncPlayer[boardName] = this.async(function () {
      this.requestBindingData(boardName)
    }, this.pollingInterval[boardName]);
  }

  /**
   * Stop Subscribing
   */
  _stopSubscribing(boardName) {
    if (this.refProvider.ids.length == 0) {
      this.$['data-subscriber'].stop()
      delete this.subscriberClient
      delete this.subscriberSubject

      this._resetPollingProps(boardName);
    }
  }

  /**
   * Stop Polling
   */
  _stopPolling(boardName) {
    if (boardName) {
      if (!this._asyncPlayer[boardName])
        return
      else {
        this.cancelAsync(this._asyncPlayer[boardName]);
        this._resetPollingProps(boardName);
        return;
      }
    }

    for (var name in this._asyncPlayer) {
      if (this._asyncPlayer.hasOwnProperty(name)) {
        var asyncPlayer = this._asyncPlayer[name];
        this.cancelAsync(asyncPlayer);
        this._resetPollingProps(name);
      }
    }
  }

  _resetPollingProps(boardName) {
    delete this._asyncPlayer[boardName];
    delete this.providerMode[boardName];
    delete this.pollingInterval[boardName];
  }
}