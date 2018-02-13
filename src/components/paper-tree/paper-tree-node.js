import { Element as PolymerElement } from '@polymer/polymer/polymer-element';

import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-menu-button/paper-menu-button';

import { ReduxMixin, saveScene } from '../../reducer/redux-mixin';

import style from './style.css';
import template from './template.html';

import '../polymer-sortablejs/polymer-sortablejs';

/**
 * `<paper-tree-node>` display a tree node with expandable / collapsible capabilities and actions menu.
 *
 * A node is defined by a name, an icon and a list of actions.
 *
 *   Example:
 *
 * <paper-tree-node></paper-tree-node>
 *
 * ### Styling
 *
 * The following custom properties and mixins are available for styling:
 *
 *   Custom property | Description | Default
 * ----------------| -------------| ----------
 *   `--paper-tree-selected-background-color` | Highlight color for selected node | `rgba(200, 200, 200, 0.5)`
 *     `--paper-tree-selected-color` | Text and icon color for selected node | `inherit`
 *       `--paper-tree-toggle-theme` | Change theme for node + /- toggle            |
 *         `--paper-tree-icon-theme` | Change theme for node icon |
 *
 * @demo
 */
class PaperTreeNode extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style>
        ${style}
      </style>

      ${template}
    `;
  }

  static get is() { return 'paper-tree-node'; }

  static get properties() {
    return {
      /**
       * Data hold by this node (contains the children).
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
        }
      },

      /**
       * `actions` available for this node. Each action object has the following fields:
       *
       * - `action.label`: string representing the display name of the menu item.
       * - `action.event`: string which is the event name to dispatch whenever the item is clicked.
       *
       */
      actions: {
        type: Array,
        value: function () {
          return null;
        }
      }
    }
  }

  /**
   * Returns the necessary classes.
   *
   * @param {object} change An object containing the property that changed and its value.
   * @return {string} The class name indicating whether the node is open or closed
   */
  _computeClass(change) {
    var open = change && change.base && change.base.open;
    var children = change && change.base && change.base.children;
    return 'node-preicon ' + ((open && children && children.length) ? 'expanded' : children && children.length ? 'collapsed' : '');
  }

  /**
   * Compute the necessary node icon.
   *
   * @param {string = folder} an icon name.
   * @return {string} the computed icon name.
   */
  _computeIcon(icon) {
    return icon ? icon : 'folder';
  }

  _actionClicked(event) {
    this.dispatchEvent(new CustomEvent(event.model.item.event, { bubbles: true, composed: true }));
  }

  /**
   * Highlights node as the selected node.
   */
  select() {
    this.dispatchEvent(new CustomEvent('select', { bubbles: true, composed: true }));
  }

  /**
   * Returns the parent tree node. Returns `null` if root.
   */
  getParent() {
    if (this.id == 'root')
      return null;

    var parentNode = this.parentNode;

    while (parentNode) {
      if (parentNode instanceof ShadowRoot) {
        let host = parentNode.host;
        if (host && host.tagName == 'PAPER-TREE-NODE')
          return parentNode.host;
        else
          return null;
      }

      parentNode = parentNode.parentNode;
    }

    return null;
  }

  /**
   * Returns the children tree nodes.
   */
  getChildren() {
    // return Polymer.dom(this.root).querySelectorAll('paper-tree-node');
    return this.root.querySelectorAll('paper-tree-node');
  }

  /**
   * Display/Hide the children nodes.
   */
  toggleChildren() {
    this.set("data.open", !this.data.open && this.data.children && this.data.children.length);
    requestAnimationFrame(() => {
      this.dispatchEvent(new CustomEvent('toggle', { bubbles: true, composed: true }));
    });
  }

}

customElements.define(PaperTreeNode.is, PaperTreeNode);
