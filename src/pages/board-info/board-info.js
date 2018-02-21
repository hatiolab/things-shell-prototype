import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../components/things-scene-viewer/things-scene-viewer';

class BoardInfo extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <things-scene-viewer model='[[model]]' fit='ratio'>
    </things-scene-viewer>
    `;
  }

  static get is() { return 'board-info'; }

  static get properties() {
    return {
      model: {
        type: Object,
        statePath: 'boardCurrent.model'
      }
    }
  }
}

customElements.define(BoardInfo.is, BoardInfo);
