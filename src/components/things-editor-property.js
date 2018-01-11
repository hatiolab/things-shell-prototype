import {Element as PolymerElement} from '@polymer/polymer/polymer-element';

import './things-i18n-msg';
import './things-editor-color';
import './things-editor-color-stops';
import './things-editor-multiple-color';
import './things-editor-color-style';
import './things-editor-number-input';
import './things-editor-angle-input';
import './things-editor-increase-pattern';
import './things-editor-location-increase-pattern';
import './things-editor-legend-status';
import './things-editor-table';
import './things-editor-action';
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
    <style include="shared-style">
      :host {}

      label {
        text-transform: capitalize;
      }

      things-editor-code {
        width: 94%;
        height: 180px;
        margin: -7px 0 7px 7px;
        overflow: auto;
      }

      label{
        @apply(--things-label);
        width:35%
      }

      select {
        @apply(--things-select);
        background: url(./assets/images/bg-input-select.png) 100% 50% no-repeat #fff;
      }

      legend {
        @apply(--things-fieldset-legend);
        padding-bottom:7px
      }

      input {
        @apply(--things-input);
        width:55%
      }

      input[type="checkbox"] {
        width:15px;
      }
    </style>

    <template is="dom-if" if="[[_isExist(label)]]" restamp="true">
      <label>
        <things-i18n-msg msgid="[[_msgId]]" auto="">[[label]]</things-i18n-msg>
      </label>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'legend')]]" restamp="true">
      <legend>[[property.label]]</legend>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'number')]]" restamp="true">
      <things-editor-number-input number="{{value::change}}">
        <input>
      </things-editor-number-input>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'angle')]]" restamp="true">
      <things-editor-angle-input radian="{{value::change}}" placeholder="[[placeholder]]">
        <input>
      </things-editor-angle-input>
    </template>


    <template is="dom-if" if="[[_isTypeofEditor(type, 'string')]]" restamp="true">
      <input type="text" value="{{value::change}}" placeholder="[[placeholder]]">
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'textarea')]]" restamp="true">
      <things-editor-code theme="ace/theme/monokai" value="{{value::change}}" mode="[[_getLanguageMode(property.language)]]">
      </things-editor-code>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'checkbox')]]" restamp="true">
      <input type="checkbox" checked="{{value::change}}" placeholder="[[placeholder]]">
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'select')]]" restamp="true">
      <select value="{{value::change}}">
        <template is="dom-repeat" items="[[property.options]]">
          <option value="[[_getOptionValue(item)]]" selected="[[_isSelected(value,item)]]">[[_getOptionDisplay(item)]]</option>
        </template>
      </select>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'color')]]" restamp="true">
      <things-editor-color value="{{value::change}}" placeholder="[[placeholder]]">
    </things-editor-color></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'solid-color-stops')]]" restamp="true">
      <things-editor-color-stops type="solid" value="{{value::change}}" min="[[property.min]]" max="[[property.max]]">
    </things-editor-color-stops></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'gradient-color-stops')]]" restamp="true">
      <things-editor-color-stops type="gradient" value="{{value::change}}" min="[[property.min]]" max="[[property.max]]">
    </things-editor-color-stops></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'multiple-color')]]" restamp="true">
      <things-editor-multiple-color values="{{value::change}}">
    </things-editor-multiple-color></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'chartjs-properties')]]" restamp="true">
      <things-editor-chartjs-properties values="{{value}}">
    </things-editor-chartjs-properties></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'action')]]" restamp="true">
      <things-editor-action icon="[[property.icon]]" action="[[property.action]]">
    </things-editor-action></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'image-selector')]]" restamp="true">
      <input value="{{value::change}}"></input>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'options')]]" restamp="true">
      <things-editor-options options="{{value}}">
    </things-editor-options></template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'editor-table')]]" restamp="true">
      <things-editor-table property="[[property]]"></things-editor-table>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'date')]]" restamp="true">
      <input type="date" value="{{value::change}}" placeholder="[[placeholder]]">
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'location-increase-pattern')]]" restamp="true">
      <things-editor-location-increase-pattern></things-editor-location-increase-pattern>
    </template>

    <template is="dom-if" if="[[_isTypeofEditor(type, 'legend-status')]]" restamp="true">
      <things-editor-legend-status value="{{value}}"></things-editor-legend-status>
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
        value: function (){ return {} }
      },
      _msgId: {
        type: String,
        computed: '_computeLabelId(label)'
      }
    }
  }

  _computeLabelId (label) {
    if (label.indexOf('label.') >= 0)
      return label;

    return 'label.' + label
  }

  _isTypeofEditor(editorType, type) {
    return editorType == type
  }

  _isExist(label) {
    var str = String(label || "")
    return label != ""
  }

  _valueChanged(value) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }));

    if(!this.get('observe'))
      return
    this.get('observe').call(this, value)
  }

  _getOptionValue (item) {
    if (typeof item == 'string')
      return item;

    return item.value;
  }

  _getOptionDisplay (item) {
    if (typeof item == 'string')
      return item;

    return item.display;
  }

  _isSelected (value, item) {
    return value == this._getOptionValue(item)
  }
}

customElements.define(ThingsEditorProperty.is, ThingsEditorProperty);
