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

export default class ThingsEditorProperty extends PolymerElement {

  static get is() { return 'things-editor-property'; }

  static get template() {
    return html`
    <style>
      :host {
        margin: 5px;

        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
      }

      :host > * {
        box-sizing: border-box;

        grid-column: span 7;
        order: 2;
      }

      label {
        grid-column: span 3;
        order: 1;

        text-align: right;

        color:var(--primary-text-color);
        font-size: 0.8em;
        line-height: 2.0;
        text-transform: capitalize;
      }

      input[type=checkbox] ~ label {
        grid-column: span 6;
        order: 2;

        text-align: left;
      }

      legend {
        @apply(--things-fieldset-legend);

        grid-column: 1 / -1;

        display: inline-block;

        text-align: left;
        text-transform: capitalize;
      }

      [fullwidth] {
        grid-column: 1 / -1;
      }

      input[type=checkbox] {
        grid-column: span 4;
        order: 1;

        justify-self: end;
        align-self: center;
      }

      ${this.styleTemplate}
    </style>

    ${this.editorTemplate}

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

  static get editorTemplate() {
    return html``;
  }

  static get styleTemplate() {
    return html``;
  }

  _computeLabelId(label) {
    if (label.indexOf('label.') >= 0)
      return label;

    return 'label.' + label
  }

  _valueChanged(value) {
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));

    if (!this.get('observe'))
      return
    this.get('observe').call(this, value)
  }
}

class PropertyEditorLegend extends ThingsEditorProperty {
  static get is() { return 'property-editor-legend'; }

  static get editorTemplate() {
    return html`
    <legend>[[property.label]]</legend>
    `;
  }
}

customElements.define(PropertyEditorLegend.is, PropertyEditorLegend);

class PropertyEditorNumber extends ThingsEditorProperty {
  static get is() { return 'property-editor-number'; }

  static get editorTemplate() {
    return html`
    <things-editor-number-input number="{{value::change}}">
      <input>
    </things-editor-number-input>
    `;
  }
}

customElements.define(PropertyEditorNumber.is, PropertyEditorNumber);

class PropertyEditorAngle extends ThingsEditorProperty {
  static get is() { return 'property-editor-angle'; }

  static get editorTemplate() {
    return html`
    <things-editor-angle-input radian="{{value::change}}" placeholder="[[placeholder]]">
      <input>
    </things-editor-angle-input>
    `;
  }
}

customElements.define(PropertyEditorAngle.is, PropertyEditorAngle);

class PropertyEditorString extends ThingsEditorProperty {
  static get is() { return 'property-editor-string'; }

  static get editorTemplate() {
    return html`
    <input type="text" value="{{value::change}}" placeholder="[[placeholder]]">
    `;
  }
}

customElements.define(PropertyEditorString.is, PropertyEditorString);

class PropertyEditorTextArea extends ThingsEditorProperty {
  static get is() { return 'property-editor-textarea'; }

  static get editorTemplate() {
    return html`
    <things-editor-code theme="ace/theme/monokai" value="{{value::change}}" fullwidth >
    </things-editor-code>
    `;
  }
}

customElements.define(PropertyEditorTextArea.is, PropertyEditorTextArea);

class PropertyEditorCheckbox extends ThingsEditorProperty {
  static get is() { return 'property-editor-checkbox'; }

  static get editorTemplate() {
    return html`
    <input type="checkbox" checked="{{value::change}}" placeholder="[[placeholder]]">
    `;
  }
}

customElements.define(PropertyEditorCheckbox.is, PropertyEditorCheckbox);

class PropertyEditorSelect extends ThingsEditorProperty {
  static get is() { return 'property-editor-select'; }

  static get editorTemplate() {
    return html`
    <select value="{{value::change}}">
    <template is="dom-repeat" items="[[property.options]]">
      <option value="[[_getOptionValue(item)]]" selected="[[_isSelected(value,item)]]">[[_getOptionDisplay(item)]]</option>
    </template>
    `;
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

customElements.define(PropertyEditorSelect.is, PropertyEditorSelect);

class PropertyEditorColor extends ThingsEditorProperty {
  static get is() { return 'property-editor-color'; }

  static get editorTemplate() {
    return html`
    <things-editor-color value="{{value::change}}" placeholder="[[placeholder]]">
    `;
  }
}

customElements.define(PropertyEditorColor.is, PropertyEditorColor);

class PropertyEditorSolidColorStops extends ThingsEditorProperty {
  static get is() { return 'property-editor-solid-colorstops'; }

  static get editorTemplate() {
    return html`
    <things-editor-color-stops type="solid" value="{{value::change}}" min="[[property.min]]" max="[[property.max]]" fullwidth >
    `;
  }
}

customElements.define(PropertyEditorSolidColorStops.is, PropertyEditorSolidColorStops);

class PropertyEditorGradientColorStops extends ThingsEditorProperty {
  static get is() { return 'property-editor-gradient-colorstops'; }

  static get editorTemplate() {
    return html`
    <things-editor-color-stops type="gradient" value="{{value::change}}" min="[[property.min]]" max="[[property.max]]" fullwidth >
    `;
  }
}

customElements.define(PropertyEditorGradientColorStops.is, PropertyEditorGradientColorStops);

class PropertyEditorMultipleColor extends ThingsEditorProperty {
  static get is() { return 'property-editor-multiple-color'; }

  static get editorTemplate() {
    return html`
    <things-editor-multiple-color values="{{value::change}}">
    `;
  }
}

customElements.define(PropertyEditorMultipleColor.is, PropertyEditorMultipleColor);

class PropertyEditorImageSelector extends ThingsEditorProperty {
  static get is() { return 'property-editor-image-selector'; }

  static get editorTemplate() {
    return html`
    <input type="text" value="{{value::change}}"></input>
    `;
  }
}

customElements.define(PropertyEditorImageSelector.is, PropertyEditorImageSelector);

class PropertyEditorDate extends ThingsEditorProperty {
  static get is() { return 'property-editor-date'; }

  static get editorTemplate() {
    return html`
    <input type="date" value="{{value::change}}"></input>
    `;
  }
}

customElements.define(PropertyEditorDate.is, PropertyEditorDate);

class PropertyEditorOptions extends ThingsEditorProperty {
  static get is() { return 'property-editor-options'; }

  static get editorTemplate() {
    return html`
    <things-editor-options options="{{value}}" fullwidth>
    `;
  }
}

customElements.define(PropertyEditorOptions.is, PropertyEditorOptions);

class PropertyEditorTable extends ThingsEditorProperty {
  static get is() { return 'property-editor-table'; }

  static get editorTemplate() {
    return html`
    <things-editor-table property="[[property]]" fullwidth></things-editor-table>
    `;
  }
}

customElements.define(PropertyEditorTable.is, PropertyEditorTable);
