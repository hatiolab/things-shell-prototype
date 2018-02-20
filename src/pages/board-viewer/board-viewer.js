import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../components/things-shell/things-shell';
import '../../layouts/page-toolbar/page-toolbar';

class BoardViewer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <page-toolbar>
    </page-toolbar>

    <things-shell id='scene' name='viewer' model='[[$model]]' provider='[[provider]]' fit='ratio'>
    </things-shell>
    `;
  }

  static get is() { return 'board-viewer'; }

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

    if (before == 'viewer' && after !== 'viewer') {
      this.$model = null;
    }
  }

  _onModelChanged(after, before) {

    if (this.page !== 'viewer')
      return;

    this.$model = this.model;
  }
}

customElements.define(BoardViewer.is, BoardViewer);
