import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute } from '../../reducer/redux-mixin';

import style from './board-card-style.css';

export default class BoardCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div id="card">
        <div on-click="onClickViewer" front>
          <iron-icon icon="icons:redo" on-click="onFlip" flip></iron-icon>
          <img src="[[thumbnail(board)]]"></img>
          <div class="name">
            <h1>[[board.name]]</h1>
            <p>[[board.description]]<slot></slot></p>
          </div>
        </div>

        <div back>
          <iron-icon icon="icons:undo" on-click="onFlip" flip></iron-icon>
          <div>
            <label>Name</label>
            <paper-input value="{{board.name}}"></paper-input>
            <label>Description</label>
            <paper-input value="{{board.description}}"></paper-input>
          </div>
          <iron-icon icon="icons:create" on-click="onClickEdit" create></iron-icon>
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

  onFlip(e) {
    if (this.classList.contains('flipped') && e.path[0].icon == 'icons:redo') {
      this.onClickEdit(e);
    } else {
      this.classList.toggle('flipped');
    }
    e.stopPropagation();
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
