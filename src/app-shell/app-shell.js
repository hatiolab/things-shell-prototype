import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { AppLocalizeBehavior } from '../components/app-localize-behavior';

import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-header-layout/app-header-layout';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-menu-button/paper-menu-button';

import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/image-icons';
import '@polymer/iron-icons/device-icons';
import '@polymer/iron-icons/av-icons';
import '@polymer/iron-icons/maps-icons';
import '@polymer/iron-icons/social-icons';

// import 'polymerfire/firebase-app.html';

import { ReduxMixin } from '../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import '../layouts/shell-drawer/shell-drawer';

import '../pages/scene-list/scene-list';
import '../pages/scene-modeler/scene-modeler';
import '../pages/scene-viewer/scene-viewer';
import '../pages/scene-info/scene-info';
import '../pages/scene-player/scene-player';

class AppShell extends mixinBehaviors([AppLocalizeBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return `
      <style include="shared-styles">${style}</style>

      ${template}
    `;
  }

  constructor() {
    super();

    this.dispatch({
      type: 'INIT-ROUTE',
      path: this.rootPath
    })
  }

  static get is() { return 'app-shell'; }

  static get properties() {
    return {
      page: {
        type: String,
        statePath: 'route.route',
        observer: '_onPageChanged'
      },
      routeData: Object,
      subroute: {
        type: String,
        statePath: 'route.subroute'
      },
      rootPath: {
        type: String,
        statePath: 'route.rootPath'
      },
      rootPattern: {
        type: String,
        statePath: 'route.rootPattern'
      },
      appVersion: {
        type: String,
        statePath: 'process.app-version'
      },
      ENV: {
        type: String,
        statePath: 'process.node-env'
      },
      mainTitle: {
        type: String,
        statePath: 'sceneCurrent.name'
      },
      user: {
        type: Object,
        statePath: 'user'
      },
      narrow: {
        type: Boolean,
        value: false
      },
      collpased: {
        statePath: 'drawer.collapsed',
        observer: 'onDrawerCollapsedChanged'
      },
      language: {
        statePath: 'user.language'
      },
      resources: {
        statePath: 'resource'
      }
    };
  }

  static get observers() {
    return [
      '_onRouteChanged(routeData)',
    ];
  }

  _onRouteChanged(routeData) {
    this.dispatch({
      type: 'CHANGE-ROUTE',
      routeData: routeData
    });
  }

  _onPageChanged(page = 'list') {
    switch (page) {
      case 'modeler':
        this.$.drawerlayout.forceNarrow = true;
        break;
      default:
        this.$.drawerlayout.forceNarrow = false;
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawerlayout.drawer.persistent) {
      this.$.drawerlayout.drawer.close();
    }


    // var resolvedPageUrl = this.resolveUrl('./src/things-' + page + '.js');

    // import(resolvedPageUrl)
    // .then(js => console.log('loaded', js))
    // .catch(e => this._showPage404());
  }

  onDrawerCollapsedChanged(collapsed) {
    this.$.drawerlayout.drawer.toggle();
  }

  _showPage404() {
    this.page = 'view404';
  }

}

customElements.define(AppShell.is, AppShell);
