import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import './things-shell-property';

export default class ThingsShellHandler extends PolymerElement {
  static get is() {
    return 'things-shell-handler';
  }

  static get template() {
    return `
      <slot select="things-shell-property"></slot>
    `;
  }

  static get properties() {
    return {
      type: String,
      model: {
        type: Object,
        notify: true
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();

    let model = {
      type: this.type
    };

    model = Array.from(this.querySelectorAll('things-shell-property'))
    .reduce((model, property) => {
      const name = property.getAttribute('name');
      const value = property.getAttribute('value');

      if (name) {
        model[name] = value;
      }

      return model;
    }, model);

    model.__host__ = this;

    this.model = model;
  }
}

customElements.define(ThingsShellHandler.is, ThingsShellHandler);
