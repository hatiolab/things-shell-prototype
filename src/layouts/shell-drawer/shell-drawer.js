import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import {ReduxMixin} from '../../reducer/redux-mixin';

import style from './style.css';

import './group-card';

class ShellDrawer extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">${style}</style>

    <app-toolbar>
      <div main-title>Scene Groups</div>
    </app-toolbar>

    <paper-listbox>
      <template is="dom-repeat" items="[[sceneGroupList]]">
        <group-card name="[[item.name]]" sequence="[[index]]">[[item.description]]</group-card>
      </template>
      <group-card name='+' add>Click to add new scene.</group-card>
    </paper-listbox>
    `;
  }

  static get is() { return 'shell-drawer'; }

  static get properties() {
    return {
      sceneGroupList: {
        type: Array,
        statePath: 'sceneGroupList'
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
      if(card.tagName !== 'GROUP-CARD')
        return;

      this.dispatch({
        type: 'SHOW-SCENE-LIST',
        scene: '101'
      })
    })
  }
}

customElements.define(ShellDrawer.is, ShellDrawer);
