import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import '../../components/paper-fab-speed-dial/paper-fab-speed-dial';
import '../../components/things-shell/things-shell';
import '../../layouts/page-toolbar/page-toolbar';

import style from './style.css';
import template from './html.template';

import './board-player-dialog';

class BoardPlayer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">${style}</style>

      ${template}
    `;
  }

  static get is() { return 'board-player'; }

  static get properties() {
    return {
      boards: {
        statePath: 'boardList',
        observer: '_onBoardsChanged'
      },
      group: {
        type: Object,
        statePath: 'boardGroupCurrent',
        // observer: 'onChangeGroup'
      },
      boardNames: {
        value: []
      },
      transition: {
        value: 'carousel'
      },
      playtime: {
        value: 30
      },
      provider: Object,
      animationConfig: {
        value: function () {
          return {
            // 'exit': [{
            //   name: 'fade-out-animation',
            //   node: this.$.fab
            // }]
          }
        }
      },
      _isFabShow: {
        value: true
      }
    }
  }

  // listeners: {
  //   'stop.tap': '_onTapStop',
  //   'transform': '_onTransform',
  //   'signals.iron-signal-subscribed': '_onSubscribed',
  //   'neon-animation-finish': '_onNeonAnimationFinish',
  //   'player-area.mousemove': '_onMousemove',
  //   'fab.mouseover': '_onMouseoverFab'
  // },

  _resetFadeTimer() {
    this._showHideFab(true);
    this._isFabShow = true;

    if (this._fadeTimer)
      clearTimeout(this._fadeTimer)

    var self = this;
    this._fadeTimer = setTimeout(function () {
      self._fadeButtons();
    }, 3000)
  }

  _fadeButtons() {
    this.playAnimation('exit')
    this._isFabShow = false;
  }

  isSame(a, b) {
    return a === b
  }

  showTransition() {
    if (this.boards) {
      this.boardNames = this.boards.map(function (board) {
        return board.name
      })

      this._startPlay()
    } else {
      this._stopPlay()
    }
  }

  _onRouteChanged(route) {

    this.$['setting-dialog'].open();

    if (route === this.getAttribute('data-route')) {
      setting.open()
      this.$.fab.hidden = true
    } else {
      setting.close()
      this.started && this._stopPlay()
    }
  }

  _onSettingDialogClosed(e) {

    this.showTransition()
    /* focus 속성을 가진 것들 중에서, 스타일에 display:none 을 포함하지 않은 엘리먼트를 찾기 */
    // this.$$(':not([style*="display: none"])[focus]').focus()
    if (this.currentPlayer)
      this.currentPlayer.focus()

    this.$.fab.hidden = false
  }

  _onBoardsChanged(after) {
    if (!this.boards || this.boards.length == 0)
      return;

    // this.showTransition()
  }

  _onMousemove() {
    this._resetFadeTimer()
  }

  _onMouseoverFab() {
    if (this._fadeTimer)
      clearTimeout(this._fadeTimer)
  }

  _onTapStop() {

    this._stopPlay()
    page(`/list/${this.group}`)
  }

  _onTapFullscreen() {
    var self = this;

    fullscreen(this, function () {
      self._showHideFab(false)
    }, function () {
      self._showHideFab(true)
    })

    if (this.currentPlayer) {
      this.currentPlayer.focus()
    }
  }

  _onTransform() {
    var self = this
    requestAnimationFrame(function () {
      if (self.started)
        self._resetTimeout()
    })
  }

  _resetTimeout() {
    if (this._timer) {
      clearTimeout(this._timer)
      delete this._timer
    }

    if (this.currentPlayer) {
      this._timer = setTimeout(() => {
        if (this._timer)
          this.currentPlayer.next()
      }, this.playtime * 1000)
    }
  }

  _onTap() {
    this.currentPlayer && this.currentPlayer.next();
  }

  _onKeydown(e) {
    var player = this.currentPlayer
    if (!player)
      return

    switch (e.keyCode) {
      case 38: // arrow up
        player.axis = 'x'
        player.next()
        break;
      case 39: // arrow right
        player.axis = 'y'
        player.next()
        break;
      case 40: // arrow down
        player.axis = 'x'
        player.previous()
        break;
      case 37: // arrow left
        player.axis = 'y'
        player.previous()
        break;
    }
  }

  _startPlay() {
    /* 플레이가 시작되는 조건
     * - boardNames가 채워질 때
     */
    this.currentPlayer = this.root.querySelector(':not([style*="display: none"])[focus]')

    this.listen(this.currentPlayer, 'tap', '_onTap');
    this.listen(this.currentPlayer, 'keydown', '_onKeydown');

    this._resetTimeout()

    this._resetFadeTimer()

    this.started = true
  }

  _stopPlay() {
    /* 플레이가 종료되는 조건
     * - 라우트가 바뀐다
     * - 종료 버튼이 눌린다
     * - boardNames가 비워지게될 때
     */
    this.unlisten(this.currentPlayer, 'tap', '_onTap');
    this.unlisten(this.currentPlayer, 'keydown', '_onKeydown');

    if (this._timer)
      clearTimeout(this._timer)

    this.boardNames = []
    this.started = false
  }

  _showHideFab(show) {
    this.$.fab.hidden = !show
  }

  _onNeonAnimationFinish(e) {
    if (!this._isFabShow)
      this._showHideFab(false)
  }

  _sameAs(a, b) {
    if (a == b)
      return true;
  }

  _onSubscribed(event) {
    if (this.route !== this.getAttribute('data-route'))
      return

    var message = event.detail;
    var currentPlayGroupId = this.group;

    var playGroupId = message.id;
    var self = this;

    switch (message.type) {
      case 'play-group-changed':
        if (currentPlayGroupId == playGroupId) {
          this.set('boards', []);
          this.set('boards', message.items);
        }

        break;

      // TODO: Release notification 관련 처리

      default:
        break;
    }
  }
}

customElements.define(BoardPlayer.is, BoardPlayer);
