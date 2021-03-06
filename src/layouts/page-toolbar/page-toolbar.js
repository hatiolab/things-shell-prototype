import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-menu-button/paper-menu-button';
import '@polymer/paper-item/paper-item';

import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/social-icons';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

class PageToolbar extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
    `;
  }

  static get is() { return 'page-toolbar'; }

  static get properties() {
    return {
      user: {
        type: Object,
        statePath: 'user'
      },
      drawerCollapsed: {
        type: Boolean,
        statePath: 'drawer.collapsed'
      }
    }
  }

  onDrawerToggler(e) {
    this.dispatch({
      type: 'TOGGLE-DRAWER'
    })
  }

  onChangeLocale(e) {
    var target = e.target;

    this.dispatch({
      type: 'SET-LOCALE',
      locale: target.getAttribute('locale')
    })
  }

}

customElements.define(PageToolbar.is, PageToolbar);
