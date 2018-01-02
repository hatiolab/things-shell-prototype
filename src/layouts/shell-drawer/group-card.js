import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import {ReduxMixin} from '../../reducer/redux-mixin';

import style from './style-group-card.css';

class GroupCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style>
    ${style}
    </style>

    <div class="card">
      <template is="dom-if" if="[[_isValidCard()]]">
        <div class="circle">[[sequence]]</div>
      </template>
      <h1>[[name]]</h1>
      <p><slot></slot></p>
    </div>
    `;
  }

  static get is() { return 'group-card'; }

  static get properties() {
    return {
      sequence: {
        type: Number
      },
      name: {
        type: String
      }
    }
  }

  _isValidCard() {
    return this.sequence !== undefined
  }
}

customElements.define(GroupCard.is, GroupCard);
