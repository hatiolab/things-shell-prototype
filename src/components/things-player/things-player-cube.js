import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-cube.css';

class ThingsPlayerCube extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div id="cube">
        <slot select="[page]"></slot>
      </div>
    `;
  }

  static get is() { return 'things-player-cube'; }

  static get properties() {
    return {
      side: {
        notify: true,
        observer: '_onSideChanged',
        value: 'front'
      }
    }
  }

  _onSideChanged(after, before) {
    if (before)
      this.removeAttribute('show-' + before)
    this.setAttribute('show-' + after, true)
    this.fire('transform')
  }

  next() {
    this.side = ['front', 'back', 'right', 'left', 'top', 'bottom'][Math.floor(Math.random() * 6)]
  }

  previous() {
    this.next()
  }
}

customElements.define(ThingsPlayerCube.is, ThingsPlayerCube);
