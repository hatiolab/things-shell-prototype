import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/paper-input/paper-input';
import '@polymer/iron-icons/iron-icons';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../components/polymer-sortablejs/polymer-sortablejs';
import '../../layouts/page-toolbar/page-toolbar';

import BoardCard from './board-card';

class BoardList extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <page-toolbar>
      <iron-icon icon="icons:search"></iron-icon>
      <things-i18n-msg msgid="label.keyword" msg="{{lKeyword}}" hidden></things-i18n-msg>
      <paper-input label="[[lKeyword]]" value="{{keyword::change}}" no-label-float></paper-input>
    </page-toolbar>

    <div id="list">
      <sortable-js disabled="[[!isPlayGroup(group)]]">
        <template is="dom-repeat" items="[[boardList]]">
          <board-card board="[[item]]" on-dragstart="onDragStart"></board-card>
        </template>
      </sortable-js>
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
      group: {
        type: Object,
        statePath: 'boardGroupCurrent',
        observer: 'onChangeGroup'
      }
    }
  }

  onChangeGroup(e) {
    var cards = this.root.querySelectorAll('.flipped');

    Array.from(cards).forEach(card => {
      card.classList.toggle('flipped');
    });
  }

  onDragStart(e) {
    var card = e.target;

    if (!(card instanceof BoardCard))
      return;

    e.dataTransfer.setDragImage(card, 0, -10);
    e.dataTransfer.setData("board", card.board.name);
  }

  isPlayGroup(group) {
    return group.type == 'play-group';
  }
}

customElements.define(BoardList.is, BoardList);
