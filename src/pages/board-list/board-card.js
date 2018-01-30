import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute } from '../../reducer/redux-mixin';

import style from './board-card-style.css';

class BoardCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div class="card" on-click="onClickViewer">
        <img src="[[thumbnail(board)]]"></img>
        <div class="name">
          <h1>[[board.name]]</h1>
          <p>[[board.description]]<slot></slot></p>
          <iron-icon icon="icons:create" on-click="onClickEdit"></iron-icon>
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

  onClickEdit(e) {
    this.dispatch(setRoute('modeler', this.board.name));
    e.stopPropagation();
  }

  onClickViewer(e) {
    this.dispatch(setRoute('viewer', this.board.name));
    e.stopPropagation();
  }

  thumbnail(board) {
    return board.thumbnail || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
  }
}

customElements.define(BoardCard.is, BoardCard);
