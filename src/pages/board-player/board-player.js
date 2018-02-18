import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior';
import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import '../../components/paper-fab-speed-dial/paper-fab-speed-dial';
import '../../components/things-shell/things-shell';
import '../../layouts/page-toolbar/page-toolbar';

import '../../components/things-player/things-player-carousel';
import '../../components/things-player/things-player-cube';
import '../../components/things-player/things-player-flipcard';
import '../../components/things-player/things-player-flipcard-edge';
import '../../components/things-player/things-player-grid';

import { fullscreen } from '../../commons/utils';

import style from './style.css';
import template from './html.template';

import './board-player-dialog';
import './things-scene-player';

class BoardPlayer extends mixinBehaviors([NeonAnimationRunnerBehavior, IronResizableBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles">${style}</style>

      ${template}
    `;
  }

  static get is() { return 'board-player'; }

  static get properties() {
    return {
      page: {
        statePath: 'route.page',
        observer: '_onPageChanged'
      },
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
      provider: Object
    }
  }

  // listeners: {
  //   'signals.iron-signal-subscribed': '_onSubscribed',
  // },

  connectedCallback() {
    super.connectedCallback();

    this.animationConfig = {
      'exit': [{
        name: 'fade-out-animation',
        node: this.$.fab
      }]
    }

    this.addEventListener('neon-animation-finish', () => {
      console.log(this.$.fab);
      this.$.fab.hidden = true;
    });

    this.addEventListener('iron-resize', () => this.currentPlayer && this.currentPlayer.build());
  }

  _resetFadeTimer() {
    this.$.fab.hidden = false;

    this._fab_timer && clearTimeout(this._fab_timer);
    this._fab_timer = setTimeout(() => this.playAnimation('exit'), 3000);
  }

  isSame(a, b) {
    return a === b
  }

  showTransition() {
    if (this.boards) {
      this.boardNames = this.boards.map(board => board.name);

      this._startPlay()
    } else {
      this._stopPlay()
    }
  }

  _onPageChanged(after, before) {

    if (before == 'player' && after !== 'player') {
      this.$['setting-dialog'].close();
      this.started && this._stopPlay()
    } else if (after == 'player') {
      this.$['setting-dialog'].open();
      this.$.fab.hidden = true
    }
  }

  _onSettingDialogClosed(e) {

    this.showTransition()

    this.currentPlayer && this.currentPlayer.focus();

    this.$.fab.hidden = false;
  }

  _onBoardsChanged(after) {
    if (this.page !== 'player')
      return;

    if (!this.boards || this.boards.length == 0)
      return;

    this.showTransition();
  }

  _onMousemove() {
    this._resetFadeTimer()
  }

  _onMouseoverFab() {
    clearTimeout(this._fab_timer);
  }

  _onTapFullscreen() {
    fullscreen(this, () => {
      this.$.fab.hidden = true;
    }, () => {
      this.$.fab.hidden = false;
    })

    this.currentPlayer && this.currentPlayer.focus();
  }

  _onTransform() {
    requestAnimationFrame(() => this.started && this._resetTransformTimer());
  }

  _resetTransformTimer() {
    clearTimeout(this._transfer_timer)

    if (this.currentPlayer) {
      this._transfer_timer = setTimeout(() => {
        if (this._transfer_timer)
          this.currentPlayer.next()
      }, this.playtime * 1000)
    }
  }

  _onTap() {
    this.currentPlayer && this.currentPlayer.next();
  }

  _onKeydown(e) {
    var player = this.currentPlayer;

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

    this.currentPlayer = this.root.querySelector(':not([style*="display: none"])[focus]');

    this._resetTransformTimer()
    this._resetFadeTimer()

    this.started = true
  }

  _stopPlay() {
    /* 플레이가 종료되는 조건
     * - 라우트가 바뀐다
     */

    clearTimeout(this._transfer_timer)

    this.boardNames = []
    this.started = false
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
