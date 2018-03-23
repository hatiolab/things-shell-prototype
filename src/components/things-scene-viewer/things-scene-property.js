import { PolymerElement, html } from '@polymer/polymer/polymer-element';

export default class ThingsShellProperty extends PolymerElement {

  static get is() {
    return 'things-scene-property';
  }

  static get properties() {
    return {
      name: String,
      value: String,
      type: String
    };
  }
}

customElements.define(ThingsShellProperty.is, ThingsShellProperty);
