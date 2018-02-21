import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
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

import { ReduxMixin, followRouteChange, fetchSettings } from '../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import '../layouts/shell-drawer/shell-drawer';

import '../pages/board-list/board-list';
import '../pages/board-modeler/board-modeler';
import '../pages/board-viewer/board-viewer';
import '../pages/board-info/board-info';
import '../pages/board-player/board-player';
import '../pages/setting-font/setting-font';
import '../pages/setting-datasource/setting-datasource';
import '../pages/setting-publisher/setting-publisher';
import '../pages/setting-security/setting-security';

import '../components/things-provider/things-provider';

class AppShell extends mixinBehaviors([AppLocalizeBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return `
      <style include="shared-styles">
      ${style}
      </style>

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
        statePath: 'route.page',
        observer: '_onPageChanged'
      },
      routePath: {
        type: String,
        statePath: 'route.path',
        observer: '_onRoutePathChanged'
      },
      routeData: {
        type: Object,
        observer: '_onRouteDataChanged'
      },
      subroute: {
        type: Object,
        observer: '_onSubrouteChanged'
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
        statePath: 'boardCurrent.name'
      },
      user: {
        type: Object,
        statePath: 'user'
      },
      /* drawer의 상태를 반영함 */
      drawerOpened: {
        type: Boolean,
        observer: 'onDrawerOpenedChanged'
      },
      /* drawer가 되어야하는 상태를 지시함 */
      collapsed: {
        statePath: 'drawer.collapsed',
        observer: 'onDrawerCollapsedChanged'
      },
      language: {
        statePath: 'user.locale'
      },
      resources: {
        statePath: 'resource'
      }
    };
  }

  _onRouteDataChanged(routeData) {
  }

  _onSubrouteChanged(subroute) {
    var page = subroute.prefix.substring(1);
    var id = subroute.path.substring(1);

    this.dispatch(followRouteChange(page, id));
  }

  _onRoutePathChanged(path) {
    this.set('appRoute.path', path);
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

  onDrawerOpenedChanged(opened) {
    if (typeof (this.collapsed) === 'undefined' || opened == !this.collapsed)
      return;

    this.dispatch({
      type: opened ? 'OPEN-DRAWER' : 'CLOSE-DRAWER'
    })
  }

  onDrawerCollapsedChanged(collapsed) {

    if (collapsed == !this.drawerOpened)
      return;

    var drawerlayout = this.$.drawerlayout;

    if ((drawerlayout.forceNarrow && this.page != 'modeler') || !drawerlayout.narrow) {
      drawerlayout.forceNarrow = collapsed;
      requestAnimationFrame(() => dispatchEvent(new Event('resize')));
    } else {
      collapsed ? drawerlayout.drawer.close() : drawerlayout.drawer.open();
    }
  }

  _showPage404() {
    this.page = 'view404';
  }

}

customElements.define(AppShell.is, AppShell);
