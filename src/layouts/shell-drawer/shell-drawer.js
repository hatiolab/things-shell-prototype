import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin, fetchGroupList } from '../../reducer/redux-mixin';

import style from './style.css';

import './group-card';

class ShellDrawer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <app-toolbar>
      <div main-title>Board Groups</div>
    </app-toolbar>

    <paper-listbox>
      <template is="dom-repeat" items="[[boardGroupList]]">
        <group-card name="[[item.name]]" sequence="[[index]]">[[item.value.description]]</group-card>
      </template>
      <group-card name='+' add>Click to add new board.</group-card>
    </paper-listbox>
    `;
  }

  static get is() { return 'shell-drawer'; }

  static get properties() {
    return {
      boardGroupList: {
        type: Array,
        statePath: 'boardGroupList'
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
      if (card.tagName !== 'GROUP-CARD')
        return;

      this.dispatch({
        type: 'SHOW-BOARD-LIST',
        scene: '101'
      })
    })

    this.dispatch(fetchGroupList());
  }
}

customElements.define(ShellDrawer.is, ShellDrawer);
