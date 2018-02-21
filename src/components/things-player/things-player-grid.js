import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-grid.css';

class ThingsPlayerGrid extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <slot select="[page]"></slot>
    `;
  }

  static get is() { return 'things-player-grid'; }

  static get properties() {
    return {
      axis: String
    }
  }

  build() {
    // do nothing.
  }

  next() {
    this.dispatchEvent(new CustomEvent('transform', { bubbles: true, composed: true }));
  }

  previous() {
    this.next()
  }
}

customElements.define(ThingsPlayerGrid.is, ThingsPlayerGrid);
