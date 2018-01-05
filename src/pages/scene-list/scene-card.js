import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import {ReduxMixin} from '../../reducer/redux-mixin';

import style from './scene-card-style.css';

class SceneCard extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>${style}</style>

      <div class="card">
        <h1>[[name]]</h1>
        <p><slot></slot></p>
      </div>
    `;
  }

  static get is() { return 'scene-card'; }

  static get properties() {
    return {
      sequence: {
        type: Number
      },
      name: {
        type: String
      }
    }
  }
}

customElements.define(SceneCard.is, SceneCard);
