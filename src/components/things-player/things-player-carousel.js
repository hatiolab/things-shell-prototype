import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-carousel.css';

class ThingsPlayerCarousel extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style>${style}</style>

      <div id="carousel">
        <slot select="[page]"></slot>
      </div>
    `;
  }

  static get is() { return 'things-player-carousel'; }

  static get properties() {
    return {
      axis: {
        notify: true,
        observer: '_onAxisChanged'
      },
      backfaceVisibility: {
        notify: true,
        observer: '_onBackfaceVisibilityChanged'
      },
      rotation: {
        value: 0
      }
    }
  }

  _buildCarousel() {
    var panel, angle, i;

    var panels = this.shadowRoot.querySelector('slot').assignedNodes({ flatten: true }).filter(n => n.nodeType === Node.ELEMENT_NODE && n.hasAttribute('page'))

    this.isHorizontal = this.axis === 'y'

    this.panelCount = panels.length

    this.panelSize = this.$.carousel[this.isHorizontal ? 'offsetWidth' : 'offsetHeight'] || '640';
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.theta = 360 / (this.panelCount || 1);

    // do some trig to figure out how big the carousel
    // is in 3D space
    this.radius = Math.round(
      (this.panelSize / 2) / Math.tan(Math.PI / (this.panelCount < 2 ? 2 : this.panelCount))
    );

    for (i = 0; i < this.panelCount; i++) {
      panel = panels[i];
      angle = this.theta * i;
      panel.style.opacity = 1;

      // panel.style.backgroundColor = 'hsla(' + angle + ', 100%, 50%, 0.8)';
      panel.style.backgroundColor = 'white'

      panel.style.transform = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    }

    // adjust rotation so panels are always flat
    this.rotation = Math.round(this.rotation / this.theta) * this.theta;
    this._transform();
  }

  _onAxisChanged(after) {
    this._buildCarousel();
  }

  _onBackfaceVisibilityChanged(after) {
    this.$.carousel.classList.toggle('backface-invisible');
  }

  _transform() {
    // push the carousel back in 3D space,
    // and rotate it
    this.$.carousel.style.transform = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
    this.dispatchEvent(new CustomEvent('transform', {}));
  }

  previous() {
    this.rotation += this.theta;
    this._transform();
  }

  next() {
    this.rotation -= this.theta;
    this._transform();
  }
}

customElements.define(ThingsPlayerCarousel.is, ThingsPlayerCarousel);
