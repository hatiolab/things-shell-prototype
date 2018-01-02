import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import './things-shell-property';

export default class ThingsShellLayer extends PolymerElement {

  static get is() {
    return 'things-shell-layer';
  }

  static get template() {
    return `
      <slot select="things-shell-property"></slot>
    `;
  }

  static get properties() {
    return {
      type: String,
      text: String
    };
  }

  getModel() {
    let model = {
      type: this.type
    };

    model = Array.from(this.querySelectorAll('things-shell-property'))
    .reduce((model, property) => {
      let value = property.value;

      if (property.name) {
        switch (property.type) {
          case 'number':
            value = Number(value);
            break;
          case 'boolean':
            value = Boolean(value);
            break;
          default:
        }

        model[property.name] = value;
      }

      return model;
    }, model);

    return model;
  }
}

customElements.define(ThingsShellLayer.is, ThingsShellLayer);
