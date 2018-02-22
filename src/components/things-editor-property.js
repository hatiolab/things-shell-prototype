import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import './things-i18n-msg';
import './things-editor-color';
import './things-editor-color-stops';
import './things-editor-multiple-color';
import './things-editor-number-input';
import './things-editor-angle-input';
import './things-editor-table';
import './things-editor-code';
import './things-editor-options';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

@demo demo/index-editor-property.html
@hero hero.svg
*/

class ThingsEditorProperty extends PolymerElement {

  static get is() { return 'things-editor-property'; }

  static get template() {
    return `
    <style>
      :host {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
      }

      :host > * {
        grid-column: 4 / 12;
        grid-row: 1;
      }

      label {
        grid-column: 1 / 4;

        display: inline-block;

        color:var(--primary-text-color);
        font-size: 0.8em;
        line-height: 2.0;
        text-transform: capitalize;
        text-align: right;
      }

      input[type=checkbox] ~ label {
        grid-column: 5 / 11;
        text-align: left;
      }

      legend {
        @apply(--things-fieldset-legend);

        grid-column: 1 / 11;

        display: inline-block;

        text-transform: capitalize;
        text-align: left;
      }

      things-editor-color-stops, things-editor-code, things-editor-table, things-editor-chartjs-properties, things-editor-options {
        grid-column: 1 / 11;
        grid-row: 2;
      }

      input[type=checkbox] {
        grid-column: 4 / 5;

        margin: 6px;
      }
    </style>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'legend')]]" restamp>
      <legend>[[property.label]]</legend>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'number')]]" restamp>
      <things-editor-number-input id="editor" number="{{value::change}}">
        <input>
      </things-editor-number-input>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'angle')]]" restamp>
      <things-editor-angle-input id="editor" radian="{{value::change}}" placeholder="[[placeholder]]">
        <input>
      </things-editor-angle-input>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'string')]]" restamp>
      <input id="editor" type="text" value="{{value::change}}" placeholder="[[placeholder]]">
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'textarea')]]" restamp>
      <things-editor-code id="editor" theme="ace/theme/monokai" value="{{value::change}}">
      </things-editor-code>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'checkbox')]]" restamp>
      <input id="editor" type="checkbox" checked="{{value::change}}" placeholder="[[placeholder]]">
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'select')]]" restamp>
      <select id="editor" value="{{value::change}}">
        <template is="dom-repeat" items="[[property.options]]">
          <option value="[[_getOptionValue(item)]]" selected="[[_isSelected(value,item)]]">[[_getOptionDisplay(item)]]</option>
        </template>
      </select>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'color')]]" restamp>
      <things-editor-color id="editor" value="{{value::change}}" placeholder="[[placeholder]]">
    </things-editor-color></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'solid-color-stops')]]" restamp>
      <things-editor-color-stops id="editor" type="solid" value="{{value::change}}" min="[[property.min]]" max="[[property.max]]">
    </things-editor-color-stops></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'gradient-color-stops')]]" restamp>
      <things-editor-color-stops id="editor" type="gradient" value="{{value::change}}" min="[[property.min]]" max="[[property.max]]">
    </things-editor-color-stops></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'multiple-color')]]" restamp>
      <things-editor-multiple-color id="editor" values="{{value::change}}">
    </things-editor-multiple-color></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'chartjs-properties')]]" restamp>
      <things-editor-chartjs-properties id="editor" values="{{value}}">
    </things-editor-chartjs-properties></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'image-selector')]]" restamp>
      <input id="editor" value="{{value::change}}"></input>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'options')]]" restamp>
      <things-editor-options id="editor" options="{{value}}">
    </things-editor-options></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'editor-table')]]" restamp>
      <things-editor-table id="editor" property="[[property]]"></things-editor-table>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'date')]]" restamp>
      <input type="date" value="{{value::change}}" placeholder="[[placeholder]]">
    </template>

    <template is="dom-if" if="[[label]]" restamp>
      <label for="editor">
        <things-i18n-msg msgid="[[_msgId]]">[[label]]</things-i18n-msg>
      </label>
    </template>
  `;
  }

  static get properties() {
    return {
      value: {
        notify: true,
        observer: '_valueChanged'
      },
      type: String,
      label: String,
      property: {
        type: Object,
        notify: true,
        value: function () { return {} }
      },
      _msgId: {
        type: String,
        computed: '_computeLabelId(label)'
      }
    }
  }

  _computeLabelId(label) {
    if (label.indexOf('label.') >= 0)
      return label;

    return 'label.' + label
  }

  _isTypeofEditor(editorType, type) {
    return editorType == type
  }

  _valueChanged(value) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }));

    if (!this.get('observe'))
      return
    this.get('observe').call(this, value)
  }

  _getOptionValue(item) {
    if (typeof item == 'string')
      return item;

    return item.value;
  }

  _getOptionDisplay(item) {
    if (typeof item == 'string')
      return item;

    return item.display;
  }

  _isSelected(value, item) {
    return value == this._getOptionValue(item)
  }
}

customElements.define(ThingsEditorProperty.is, ThingsEditorProperty);
