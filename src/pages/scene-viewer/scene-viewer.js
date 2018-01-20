import {Element as PolymerElement, html} from '@polymer/polymer/polymer-element';

import {ReduxMixin} from '../../reducer/redux-mixin';

import style from './style.css';

import '../../components/things-shell/things-shell';

class SceneViewer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <things-shell model='[[model]]' fit='ratio'>
      <!-- <things-shell-layer type="shift-layer"></things-shell-layer>
        <things-shell-layer type="confidential-overlay">
        <things-shell-property name="text" value="[[confidential]]"></things-shell-property>
      </things-shell-layer> -->
    </things-shell>
    `;
  }

  static get is() { return 'scene-viewer'; }

  static get properties() {
    return {
      model: {
        type: Object,
        statePath: 'sceneCurrent.model'
      }
    }
  }
}

customElements.define(SceneViewer.is, SceneViewer);
