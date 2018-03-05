import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../components/things-scene-viewer/things-scene-viewer';

class BoardInfo extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>
    `;
  }

  static get is() { return 'board-info'; }

  static get properties() {
    return {
      page: {
        statePath: 'route.page',
        observer: '_onPageChanged'
      },

      model: {
        type: Object,
        statePath: 'boardCurrent.model',
        observer: '_onModelChanged'
      },

      provider: Object
    }
  }

  _onPageChanged(after, before) {

    if (before == 'info' && after !== 'info') {
      this.$model = null;
    }
  }

  _onModelChanged(after, before) {

    if (this.page !== 'info')
      return;

    this.$model = this.model;
  }
}

customElements.define(BoardInfo.is, BoardInfo);
