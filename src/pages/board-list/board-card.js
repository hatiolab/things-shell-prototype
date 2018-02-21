import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, setRoute, updateBoard } from '../../reducer/redux-mixin';

import style from './board-card-style.css';

export default class BoardCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <div id="card">
        <div on-click="onClickViewer" front>
          <img src="[[thumbnail(board)]]"></img>
          <div class="name">
            <h1>[[board.name]]</h1>
            <p>[[board.description]]<slot></slot></p>
            <iron-icon icon="icons:redo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>

        <div back>
          <div id="info">
            <things-i18n-msg msgid="label.created-at" msg="{{lCreatedAt}}" hidden></things-i18n-msg>
            <h5>[[lCreatedAt]] [[toDateString(board.createdAt, locale)]]</h5>

            <things-i18n-msg msgid="label.updated-at" msg="{{lUpdatedAt}}" hidden></things-i18n-msg>
            <h5>[[lUpdatedAt]] [[toDateString(board.updatedAt, locale)]]</h5>

            <things-i18n-msg msgid="label.description" msg="{{lDescription}}" hidden></things-i18n-msg>
            <paper-input label="[[lDescription]]" value="{{board.description}}" on-change="onChangeDescription"></paper-input>
          </div>

          <iron-icon icon="icons:create" on-click="onClickEdit" create></iron-icon>

          <div class="name">
            <h1>[[board.name]]</h1>
            <p>[[board.description]]<slot></slot></p>
            <iron-icon icon="icons:undo" on-click="onFlip" flip></iron-icon>
          </div>
        </div>
      </div>
    `;
  }

  static get is() { return 'board-card'; }

  static get properties() {
    return {
      board: Object,
      locale: {
        statePath: 'user.locale'
      }
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

  onChangeDescription(e) {
    var input = e.target;
    this.dispatch(updateBoard({
      name: this.board.name,
      description: input.value
    }));
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

  toDateString(t, locale) {
    return t ? new Date(t).toLocaleString(locale) : '';
  }
}

customElements.define(BoardCard.is, BoardCard);
