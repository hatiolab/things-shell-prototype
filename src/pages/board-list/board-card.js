import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './board-card-style.css';

class BoardCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div class="card">
        <h1>[[board.name]]</h1>
        <p>[[board.description]]</p>
        <img src="[[thumbnail()]]"></img>
      </div>
    `;
  }

  static get is() { return 'board-card'; }

  static get properties() {
    return {
      board: Object
    }
  }

  thumbnail() {
    return this.board.thumbnail || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
}

customElements.define(BoardCard.is, BoardCard);
