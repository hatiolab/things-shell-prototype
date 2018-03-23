import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { PaperDialogBehavior } from '@polymer/paper-dialog-behavior/paper-dialog-behavior';
import '@polymer/paper-dialog-behavior/paper-dialog-shared-styles';
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';

import { ReduxMixin } from '../../reducer/redux-mixin';

class BoardPlayerDialog extends mixinBehaviors([NeonAnimationRunnerBehavior, PaperDialogBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return `
    <style include="paper-dialog-shared-styles">
    :host {
      padding: 20px;
    }

    .buttons{
      padding:5px 12px;
      text-align:right
    }
    </style>

    <h2>Player Settings</h2>

    <div>
      <paper-dropdown-menu label="Transition Type" value="{{transition}}">
        <paper-listbox slot="dropdown-content" selected="[[selectedTransition(transition)]]">
          <template is="dom-repeat" items="[[transitions]]">
            <paper-item>[[item]]</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu>
    </div>

    <template is="dom-if" if="[[_needPlaytime(transition)]]">
      <div>
        <paper-dropdown-menu label="Playtime for a Scene" value="{{playtime}}">
          <paper-listbox slot="dropdown-content" selected="[[selectedPlaytime(playtime)]]">
            <template is="dom-repeat" items="[[playtimes]]">
              <paper-item>[[item]]</paper-item>
            </template>
          </paper-listbox>
        </paper-dropdown-menu>
      </div>
    </template>

    <div class="buttons">
      <paper-button dialog-confirm autofocus>OK</paper-button>
    </div>
    `;
  }

  static get is() { return 'board-player-dialog'; }

  static get properties() {
    return {
      transitions: {
        type: Array,
        notify: true,
        value: ['carousel', 'flip-card', 'flip-card2', 'grid']
      },
      transition: {
        type: String,
        value: 'carousel',
        notify: true
      },
      playtimes: {
        type: Array,
        notify: true,
        value: [10, 30, 60, 300, 600]
      },
      playtime: {
        type: Number,
        value: 30,
        notify: true
      }
    }
  }

  // TODO 아래 두개 함수 구현 이상함. (불필요한 것 아닌가 ?)
  selectedTransition(transition) {
    for (var i = 0; i < this.transitions.length; i++) {
      if (this.transitions[i] == transition)
        return i
    }
  }

  selectedPlaytime(playtime) {
    for (var i = 0; i < this.playtimes.length; i++) {
      if (this.playtimes[i] == playtime)
        return i
    }
  }

  _needPlaytime(transition) {
    return transition !== 'grid'
  }
}

customElements.define(BoardPlayerDialog.is, BoardPlayerDialog);
