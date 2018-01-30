import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

class BoardPlayer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>
    `;
  }

  static get is() { return 'board-player'; }

  static get properties() {
    return {
    }
  }
}

customElements.define(BoardPlayer.is, BoardPlayer);
