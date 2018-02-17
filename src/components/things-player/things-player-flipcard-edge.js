import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-flipcard-edge.css';

class ThingsPlayerFlipcardEdge extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div id="card">
        <slot select="[front]"></slot>
        <slot select="[back]"></slot>
      </div>
    `;
  }

  static get is() { return 'things-player-flipcard-edge'; }

  static get properties() {
    return {
      axis: String
    }
  }

  next() {
    if (this.hasAttribute('flipped')) {
      this.removeAttribute('flipped');
    } else {
      this.setAttribute('flipped', '');
    }

    this.dispatchEvent(new CustomEvent('transform', {}));
  }

  previous() {
    this.next()
  }
}

customElements.define(ThingsPlayerFlipcardEdge.is, ThingsPlayerFlipcardEdge);
