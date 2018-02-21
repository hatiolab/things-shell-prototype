import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';

class SettingPublisher extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    <page-toolbar>
    </page-toolbar>

    <div>
      <h1>Setting Publisher</h1>
    </div>
    `;
  }

  static get is() { return 'setting-publisher'; }

  static get properties() {
    return {
    };
  }
}

customElements.define(SettingPublisher.is, SettingPublisher);
