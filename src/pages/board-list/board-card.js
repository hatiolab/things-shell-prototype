import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './board-card-style.css';

class BoardCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div class="card">
        <img src="[[thumbnail(board)]]"></img>
        <div class="name">
          <h1>[[board.name]]</h1>
          <p>[[board.description]]<slot></slot></p>
        </div>
      </div>
    `;
  }

  static get is() { return 'board-card'; }

  static get properties() {
    return {
      board: Object
    }
  }

  thumbnail(board) {
    return board.thumbnail || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
}

customElements.define(BoardCard.is, BoardCard);
