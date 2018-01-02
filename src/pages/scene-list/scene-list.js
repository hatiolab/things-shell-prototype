import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-grid/app-grid-style';

import {ReduxMixin} from '../../reducer/redux-mixin';

import style from './style.css';

import './scene-card';

class SceneList extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="app-grid-style"></style>
    <style include="shared-styles">${style}</style>

    <div class="app-grid">
      <scene-card name='+' add>Click to add new scene.</scene-card>
      <template is="dom-repeat" items="[[sceneList]]">
        <scene-card name="[[item.name]]" sequence="[[index]]">[[item.description]]</scene-card>
      </template>
    </div>
`;
  }

  static get is() { return 'scene-list'; }

  static get properties() {
    return {
      sceneList: {
        type: Array,
        statePath: 'sceneList'
      },
      selected: {
        type: Number,
        value: 0
      }
    }
  }

  ready() {
    super.ready();

    this.shadowRoot.addEventListener('click', e => {
      var card = e.target;
      if(card.tagName !== 'SCENE-CARD')
        return;

      this.dispatch({
        type: 'SHOW-SCENE-MODELER',
        scene: '101'
      })
    })
  }
}

customElements.define(SceneList.is, SceneList);
