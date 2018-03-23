import { PolymerElement } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import './paper-tree-node';

class PaperTree extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <div>
        <paper-tree-node id="root" data="[[data]]" actions="[[actions]]"></paper-tree-node>
      </div>
    `;
  }

  static get is() { return 'paper-tree'; }

  static get properties() {
    return {
      /**
       * Data hold by the root node (contains the children).
       *
       * Specific data:
       *
       * - `data.name`: string representing the node name.
       * - `data.icon`: string telling which icon to use (default to 'folder' icon).
       * - `data.open`: boolean telling whether the node is expanded or not.
       * - `data.children` array containing the children of the node.
       */
      data: {
        type: Object,
        value: function () {
          return null;
        },
        observer: "_dataChanged"
      },

      /**
       * `selected` is the current selected ` < paper - tree - node > ` in the tree.
       */
      selected: {
        type: Object,
        value: null,
        notify: true
      },

      /**
       * `actions` available for all nodes. Each action object has the following fields:
       *
       * - `action.label`: string representing the display name of the menu item.
       * - `action.event`: string which is the event name to dispatch whenever the item is clicked.
       *
       */
      actions: {
        type: Array,
        value: function () {
          return null;
        },
        observer: "_actionsChanged"
      }
    }
  }

  ready() {
    super.ready();

    this.root.addEventListener('select', this._selectNode.bind(this));
  }

  /**
   * Called whenever the data is changed to notify the lower nodes.
   */
  _dataChanged() {
    this.$.root.data = this.data;
  }

  /**
   * Called whenever the actions list is changed to notify the lower nodes.
   */
  _actionsChanged() {
    this.$.root.actions = this.actions;
  }

  /**
   * Called when the `select` event is fired from an internal node.
   *
   * @param {object} e An event object.
   */
  _selectNode(e) {
    var target = e.path[0];

    if (this.selected) {
      this.selected.classList.remove('selected');
    }

    if (target) {
      this.selected = target;
      this.selected.classList.add('selected');
    } else {
      this.selected = null;
    }
  }
}

customElements.define(PaperTree.is, PaperTree);
