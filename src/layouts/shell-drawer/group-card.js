import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style-group-card.css';

class GroupCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <div class="card">
      <h1>[[name]]</h1>
      <p><slot></slot></p>
    </div>
    `;
  }

  static get is() { return 'group-card'; }

  static get properties() {
    return {
      name: {
        type: String
      }
    }
  }
}

customElements.define(GroupCard.is, GroupCard);
