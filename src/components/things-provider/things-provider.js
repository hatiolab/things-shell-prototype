import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
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
        var url = self.globals.baseUrl + '/boards/' + boardName + (boardVersion ? '/' + boardVersion : '')

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
        }

        delete self.names[boardName]

        self.async(() => {
          ref.dispose();
        }, 10)
      }
    )
  }
}