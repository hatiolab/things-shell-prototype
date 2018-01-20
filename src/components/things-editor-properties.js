import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import './things-editor-property';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
모든 에디터들은 change 이벤트를 지원해야 한다. 또한, 모든 에디터들은 value속성에 값을 가져야 한다.

Example:

    <things-editor-properties target="{{target}}">
      <label>Center X</label>
      <things-editor-number-input number="{{target.cx::change}}">
        <input>
      </things-editor-number-input>
      <label>Width</label>
      <things-editor-number-input number="{{target.width::change}}">
        <input>
      </things-editor-number-input>
    </things-editor-properties>

@demo demo/index-editor-properties.html
@hero hero.svg
*/

class ThingsEditorProperties extends PolymerElement {
  static get is() { return 'things-editor-properties'; }

  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      fieldset, fieldset{
        @apply(--things-fieldset);
      }
      label{
        @apply(--things-label);
        width:35%
      }
      input{
        @apply(--things-input);
        width:55%
      }
      legend{
        @apply(--things-fieldset-legend);
        padding-bottom:7px
      }
      input[type="checkbox"]{
        width:15px;
      }
      .full-width > * {
        float:left;
      }
      .full-width > input, .full-width > things-editor-number-input {
        width:32.4%;
      }
    </style>

    <slot></slot>

    <fieldset>
      <template id="dom-repeater" is="dom-repeat" items="[[props]]" on-dom-change="_onDomBuilt">
        <things-editor-property label="[[item.label]]"
                                type="[[item.type]]"
                                name$="[[item.name]]"
                                placeholder="[[item.placeholder]]"
                                observe="[[item.observe]]"
                                property="[[item.property]]">
        </things-editor-property>
      </template>
    </fieldset>
    `;
  }

  static get properties() {
    return {
      target: {
        type: Object,
        notify: true
      },

      props: {
        type: Array,
        value: function () { return [] }
      }
    }
  }

  static get observers() {
    return [
      '_onTargetChanged(target.*)'
    ]
  }

  ready() {
    super.ready();

    this.root.addEventListener('change', this._onValueChanged.bind(this));
  }

  _onDomBuilt() {
    this._setValues()
  }

  _setValues() {
    this.target && Array.from(this.shadowRoot.querySelectorAll('things-editor-property')).forEach(prop => {
      let name = prop.getAttribute('name')
      prop.set('value', this.target[name])
    })
  }

  _onTargetChanged(change) {
    this._setValues()
  }

  _onValueChanged(e) {
    var prop = e.target;

    while (prop && prop.tagName != 'THINGS-EDITOR-PROPERTY')
      prop = prop.parentNode;

    if (!prop || prop.tagName != 'THINGS-EDITOR-PROPERTY')
      return;

    var name = prop.getAttribute('name');
    this.set('target.' + name, prop.value);
  }
}

customElements.define(ThingsEditorProperties.is, ThingsEditorProperties);
