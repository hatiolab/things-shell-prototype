import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/app-layout/app-grid/app-grid-style';
import '@polymer/paper-input/paper-input';

import { ReduxMixin } from '../../reducer/redux-mixin';
import '@polymer/iron-icons/iron-icons';
import { AppLocalizeBehavior } from '../../components/app-localize-behavior';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';
import './board-card';

class BoardList extends mixinBehaviors([AppLocalizeBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return html`
    <style include="app-grid-style"></style>
    <style include="shared-styles">${style}</style>

    <page-toolbar>
      <iron-icon icon="icons:search"></iron-icon>
      <paper-input label="[[localize('keyword')]]" value="{{keyword::change}}" no-label-float></paper-input>
    </page-toolbar>

    <div class="app-grid">
      <board-card board="[[board4add]]" add>
        <things-i18n-msg msgid="label.click-to-add-new-board">Click to add new board.</things-i18n-msg>
      </board-card>
      <template is="dom-repeat" items="[[boardList]]">
        <board-card board="[[item]]"></board-card>
      </template>
    </div>
    `;
  }

  static get is() { return 'board-list'; }

  static get properties() {
    return {
      boardList: {
        type: Array,
        statePath: 'boardList'
      },
      selected: {
        type: Number,
        value: 0
      },
      language: {
        statePath: 'user.language'
      },
      resources: {
        statePath: 'resource'
      },
      board4add: {
        value: {
          name: '+'
        }
      }
    }
  }
}

customElements.define(BoardList.is, BoardList);
