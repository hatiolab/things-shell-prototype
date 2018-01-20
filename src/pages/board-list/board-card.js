import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './board-card-style.css';

class BoardCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div class="card">
        <h1>[[name]]</h1>
        <p><slot></slot></p>
      </div>
    `;
  }

  static get is() { return 'board-card'; }

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
}

customElements.define(BoardCard.is, BoardCard);
