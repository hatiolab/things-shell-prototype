import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-image/iron-image';
import '@polymer/paper-radio-group/paper-radio-group';

import {ReduxMixin} from '../../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import '../../../../components/things-editor-buttons-radio';
import '../../../../components/things-editor-number-input';
import '../../../../components/things-editor-angle-input';
import '../../../../components/things-editor-color';
import '../../../../components/things-editor-color-style';

class PropertyStyles extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">${style}</style>

    ${template}
  `;
  }

  static get is() { return 'property-style'; }

  static get properties() {
    return {
      model: {
        notify: true
      }
    }
  }

  _isLine (selected) {
    var isLine = true;

    for (var i = 0; i < selected.length; i++) {
      var comp = selected[i];
      if (!comp.isLine()) {
        isLine = false
        return isLine;
      }
    }

    return isLine;
  }

  /**
   * image가 변경되면 발생하는 event로
   * 변경된 값을 model.src에 set
   */
  imageChanged (event) {
    this.set('model.src', event.detail);
  }

  onUrlChanged (event) {
    this.set('model.url', event.target.value);
  }
}

window.customElements.define(PropertyStyles.is, PropertyStyles);
