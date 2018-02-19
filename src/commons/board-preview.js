import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';

import '../components/things-shell/things-shell';

export default class BoardPreview extends mixinBehaviors([IronResizableBehavior], PolymerElement) {

  static get is() {
    return 'board-preview';
  }

  static get template() {
    return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
      }

      things-shell {
        flex: 1;
        background-color: white;
      }
    </style>

    <things-shell name='preview' id='scene' model='[[model]]' provider='[[provider]]' fit='ratio'>
    </things-shell>
      `;
  }

  static get properties() {
    return {
      model: Object,
      // baseUrl: {
      //   type: String,
      //   value: ''
      // },
      provider: Object
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.model = null;
  }
}

customElements.define(BoardPreview.is, BoardPreview);
