import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/app-layout/app-grid/app-grid-style';

import { ReduxMixin, fetchBoardList } from '../../reducer/redux-mixin';
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
      <board-card name='+' add on-click="onClickNew">Click to add new scene.</board-card>
      <template is="dom-repeat" items="[[boardList]]">
        <board-card name="[[item.name]]" sequence="[[index]]">[[item.value.description]]</board-card>
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
    }
  }

  ready() {
    super.ready();

    this.shadowRoot.addEventListener('click', e => {
      var card = e.target;
      if (card.tagName !== 'BOARD-CARD')
        return;

      this.dispatch({
        type: 'SHOW-BOARD-MODELER',
        scene: '101'
      })
    })

    this.dispatch(fetchBoardList());
  }

  onClickNew() {
    this.dispatch({
      type: 'NEW-BOARD'
    });
  }
}

customElements.define(BoardList.is, BoardList);
