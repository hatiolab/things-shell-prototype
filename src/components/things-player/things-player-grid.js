import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './things-player-grid.css';

class ThingsPlayerGrid extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
      ${style}
      </style>

      <slot id="slot" select="[page]" on-click="onClick"></slot>
    `;
  }

  static get is() { return 'things-player-grid'; }

  static get properties() {
    return {
      axis: String
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this._slotObserver = new FlattenedNodesObserver(this.$.slot, info => {

      var panels = this.querySelectorAll('[page]');
      var length = panels.length;
      var column = length >= 10 ? Math.ceil(length / 2) : 6;
      var row = length >= 10 ? column - 1 : 6;

      this.style['grid-template-columns'] = `repeat(${column}, 1fr)`;
      this.style['grid-template-rows'] = `repeat(${column}, 1fr)`;

      if (this._styleElement) {
        this._styleElement.remove();
      }

      this._styleElement = document.createElement('style');
      this._styleElement.textContent = `
      ::slotted(.enlarge) {
        grid-column: span ${column - 1};
        grid-row: span ${row};
      }
      `;
      this.root.appendChild(this._styleElement);

      this.changeEnlarge();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._slotObserver.disconnect();
  }

  changeEnlarge(target) {
    var panels = this.querySelectorAll('[page]');
    target = target || panels[0];

    Array.from(panels).forEach(panel => {
      panel.style['order'] = 2;
      panel.classList.remove('enlarge');
    });

    target.style['order'] = 1;
    target.classList.add('enlarge');

    dispatchEvent(new Event('resize'));
  }

  onClick(e) {
    var current = this.querySelector('.enlarge');
    if (current !== e.target) {
      this.changeEnlarge(e.target);
    }
  }

  build() {
  }

  next() {
    this.dispatchEvent(new CustomEvent('transform', { bubbles: true, composed: true }));
  }

  previous() {
    this.next()
  }
}

customElements.define(ThingsPlayerGrid.is, ThingsPlayerGrid);
