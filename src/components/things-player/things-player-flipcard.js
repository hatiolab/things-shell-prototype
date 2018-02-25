import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-flipcard.css';

class ThingsPlayerFlipcard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <div id="card">
        <slot select="[front]"></slot>
        <slot select="[back]"></slot>
      </div>
    `;
  }

  static get is() { return 'things-player-flipcard'; }

  static get properties() {
    return {
      axis: String
    }
  }

  build() {
    // do nothing.
  }

  next() {
    if (this.hasAttribute('flipped')) {
      this.removeAttribute('flipped');
    } else {
      this.setAttribute('flipped', '');
    }

    this.dispatchEvent(new CustomEvent('transform', { bubbles: true, composed: true }));
  }

  previous() {
    this.next()
  }
}

customElements.define(ThingsPlayerFlipcard.is, ThingsPlayerFlipcard);
