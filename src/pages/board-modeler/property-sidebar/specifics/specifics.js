import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-image/iron-image';

import { ReduxMixin } from '../../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import '../../../../components/things-editor-properties';

class PropertySpecific extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
  `;
  }

  static get is() { return 'property-specific'; }

  static get properties() {
    return {
      model: {
        notify: true
      },

      scene: Object,
      selected: Array,
      props: Array
    }
  }

  constructor() {
    super();

    this.boundTableCellBorderSet = this._onTableCellBorderSet.bind(this);;
    this.boundActionClick = this._onActionClick.bind(this);;
    this.boundTableCellEvent = this._onTableCellEvent.bind(this);;
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('table-cell-border-set', this.boundTableCellBorderSet);
    this.addEventListener('action-editor-clicked', this.boundActionClick);
    this.addEventListener('table-delete-row', this.boundTableCellEvent);
    this.addEventListener('table-delete-column', this.boundTableCellEvent);
    this.addEventListener('table-insert-above', this.boundTableCellEvent);
    this.addEventListener('table-insert-below', this.boundTableCellEvent);
    this.addEventListener('table-insert-left', this.boundTableCellEvent);
    this.addEventListener('table-insert-right', this.boundTableCellEvent);
    this.addEventListener('table-merge-cells', this.boundTableCellEvent);
    this.addEventListener('table-split-cells', this.boundTableCellEvent);
    this.addEventListener('table-distribute-horizontal', this.boundTableCellEvent);
    this.addEventListener('table-distribute-vertical', this.boundTableCellEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('table-cell-border-set', this.boundTableCellBorderSet);
    this.removeEventListener('action-editor-clicked', this.boundActionClick);
    this.removeEventListener('table-delete-row', this.boundTableCellEvent);
    this.removeEventListener('table-delete-column', this.boundTableCellEvent);
    this.removeEventListener('table-insert-above', this.boundTableCellEvent);
    this.removeEventListener('table-insert-below', this.boundTableCellEvent);
    this.removeEventListener('table-insert-left', this.boundTableCellEvent);
    this.removeEventListener('table-insert-right', this.boundTableCellEvent);
    this.removeEventListener('table-merge-cells', this.boundTableCellEvent);
    this.removeEventListener('table-split-cells', this.boundTableCellEvent);
    this.removeEventListener('table-distribute-horizontal', this.boundTableCellEvent);
    this.removeEventListener('table-distribute-vertical', this.boundTableCellEvent);
  }

  _onRackTableCellIncrementSet(e, detail) {
    if (!this.model)
      return;

    var selected = this.selected;

    var {
      increasingDirection,
      skipNumbering,
      startSection,
      startUnit
    } = detail

    this.scene.undoableChange(function () {
      selected.forEach(cell => {
        if (increasingDirection == 'cw')
          cell.increaseLocationCW(skipNumbering, startSection, startUnit)
        else
          cell.increaseLocationCCW(skipNumbering, startSection, startUnit)

      });
    })
  }

  _onTableCellBorderSet(e) {
    if (!this.model)
      return;

    var {
      type, borderWidth, borderStyle, borderColor
    } = e.detail;

    var table = this.selected[0].parent;
    if (table.get('type') !== 'table')
      return;

    var selected = this.selected;

    this.scene.undoableChange(function () {
      table.setCellsStyle(selected, {
        strokeStyle: borderColor,
        lineDash: borderStyle,
        lineWidth: borderWidth
      }, type);
    })
  }

  _onActionClick(e) {
    var action = e.detail;

    typeof (action) === 'function' && action(this.selected[0])
  }

  _onTableCellEvent(e) {
    var table = this.selected[0].parent;
    if (!table || !table.get('type').match(/table$/))
      return;

    var self = this;

    this.scene.undoableChange(function () {
      switch (e.type) {
        case 'table-delete-row':
          table.deleteRows(self.selected)
          break;
        case 'table-delete-column':
          table.deleteColumns(self.selected)
          break;
        case 'table-insert-above':
          table.insertCellsAbove(self.selected)
          break;
        case 'table-insert-below':
          table.insertCellsBelow(self.selected)
          break;
        case 'table-insert-left':
          table.insertCellsLeft(self.selected)
          break;
        case 'table-insert-right':
          table.insertCellsRight(self.selected)
          break;
        case 'table-merge-cells':
          table.mergeCells(self.selected)
          break;
        case 'table-split-cells':
          table.splitCells(self.selected)
          break;
        case 'table-distribute-horizontal':
          table.distributeHorizontal(self.selected)
          break;
        case 'table-distribute-vertical':
          table.distributeVertical(self.selected)
          break;
      }
    })
  }
}

window.customElements.define(PropertySpecific.is, PropertySpecific);
