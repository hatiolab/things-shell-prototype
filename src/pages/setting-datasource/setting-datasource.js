import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';

class SettingDataSource extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    <page-toolbar>
    </page-toolbar>

    <div>
      <h1>Setting DataSource</h1>
    </div>
    `;
  }

  static get is() { return 'setting-datasource'; }

  static get properties() {
    return {
    };
  }
}

customElements.define(SettingDataSource.is, SettingDataSource);
