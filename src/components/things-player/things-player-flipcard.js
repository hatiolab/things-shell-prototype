import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-flipcard.css';

class ThingsPlayerFlipcard extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

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

  next() {
    this.toggleAttribute('flipped')
    this.fire('transform')
  }

  previous() {
    this.next()
  }
}

customElements.define(ThingsPlayerFlipcard.is, ThingsPlayerFlipcard);
