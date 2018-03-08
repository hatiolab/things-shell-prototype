import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-icons/av-icons';

import { ReduxMixin, setRoute } from '../../reducer/redux-mixin';

import style from './style-group-card.css';

export default class GroupCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    <div class="card">
      <h1>[[group.name]]</h1>
      <p><slot></slot>[[group.description]]</p>
      <template is="dom-if" if="[[_isPlayGroup(group)]]">
        <paper-icon-button icon="av:play-arrow" on-click="onClickPlay"></paper-icon-button>
      </template>
      <template is="dom-if" if="[[_isBoardCreatableGroup(group)]]">
        <paper-icon-button icon="icons:add" on-click="onClickNewBoard"></paper-icon-button>
      </template>
    </div>
    `;
  }

  static get is() { return 'group-card'; }

  static get properties() {
    return {
      group: {
        type: Object
      }
    }
  }

  dim(on) {
    var button = this.root.querySelector('paper-icon-button');
    if (on)
      button.style.color = 'red'
    else
      button.style.color = ''
  }

  onClickPlay(e) {
    this.dispatch(setRoute('player', this.group.name));
    e.stopPropagation();
  }

  onClickNewBoard(e) {
    this.dispatch({
      type: 'NEW-BOARD'
    });

    this.dispatch(setRoute('modeler', ''));

    e.stopPropagation();
  }

  _isPlayGroup(group) {
    return group.type == 'play-group';
  }

  _isBoardCreatableGroup(group) {
    return group.type !== 'play-group';
  }
}

customElements.define(GroupCard.is, GroupCard);
