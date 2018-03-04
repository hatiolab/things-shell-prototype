import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { ReduxMixin } from '../reducer/redux-mixin';

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

class ThingsEditorProperties extends ReduxMixin(PolymerElement) {
  static get is() { return 'things-editor-properties'; }

  static get template() {
    return html`
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
        value: function () { return [] },
        observer: '_onPropsChanged'
      },

      propertyEditor: {
        type: Object,
        statePath: 'propertyEditor'
      }
    }
  }

  static get observers() {
    return [
      '_onTargetChanged(target.*)'
    ]
  }

  _onPropsChanged(props) {
    this.shadowRoot.textContent = '';

    (props || []).forEach(prop => {
      let elementType = this.propertyEditor[prop.type];
      if (!elementType) {
        console.warn('Property Editor not defined', prop.type);
        return;
      }
      let element = document.createElement(elementType);

      element.label = prop.label;
      element.type = prop.type;
      element.setAttribute('name', prop.name);
      prop.placeholder = prop.placeholder;
      if (prop.observe)
        element.observe = prop.observe;
      element.property = prop.property;
      element.setAttribute('property-editor', true);

      this.shadowRoot.appendChild(element);
    });

    this._setValues();
  }

  ready() {
    super.ready();

    this.root.addEventListener('change', this._onValueChanged.bind(this));
  }

  _setValues() {
    this.target && Array.from(this.shadowRoot.querySelectorAll('[name]')).forEach(prop => {
      let name = prop.getAttribute('name')
      prop.set('value', this.target[name])
    })
  }

  _onTargetChanged(change) {
    this._setValues()
  }

  _onValueChanged(e) {
    var prop = e.target;

    while (prop && !prop.hasAttribute('property-editor'))
      prop = prop.parentNode;

    if (!prop || !prop.hasAttribute('property-editor'))
      return;

    var name = prop.getAttribute('name');
    this.set('target.' + name, prop.value);
  }
}

customElements.define(ThingsEditorProperties.is, ThingsEditorProperties);
