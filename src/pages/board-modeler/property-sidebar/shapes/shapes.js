import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-image/iron-image';

import {
  ReduxMixin
} from '../../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import '../../../../components/things-i18n-msg';
import '../../../../components/things-editor-buttons-radio';
import '../../../../components/things-editor-number-input';
import '../../../../components/things-editor-angle-input';
import '../../../../components/things-editor-buttons-radio';

class PropertyShapes extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
  `;
  }

  static get is() {
    return 'property-shape';
  }

  static get properties() {
    return {
      model: {
        notify: true
      },
      bounds: {
        notify: true
      }
    }
  }

  _hasTextProperty(selected) {
    for (let i = 0; i < selected.length; i++) {
      if (!selected[i].hasTextProperty)
        return false
    }

    return true;
  }

  _hasProperties(selected) {
    if (!selected || selected.length == 0 || selected[0].isLayer())
      return false;

    return true;
  }

  _isIdentifiable(selected) {
    if (!selected || selected.length !== 1 || selected[0].isLayer())
      return false;

    return true;
  }

  _isClassIdentifiable(selected) {
    if (!selected || (selected[0] && selected[0].isLayer()))
      return false;

    return true;
  }

  _isLine(selected) {
    if (!selected || (selected[0] && selected[0].isLine()))
      return false;
    return true
  }

  _is3dish(selected) {
    if (!selected || !(selected[0] && selected[0].is3dish()))
      return false;
    return true
  }
}

customElements.define(PropertyShapes.is, PropertyShapes);
