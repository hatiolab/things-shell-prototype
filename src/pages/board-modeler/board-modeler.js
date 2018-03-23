import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-dialog/paper-dialog';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import { togglefullscreen } from '../../commons/utils';
import '../../commons/board-preview';
import '../../components/things-scene-viewer/things-scene-viewer';

import './edit-toolbar/edit-toolbar';
import './component-toolbar/component-toolbar';
import './property-sidebar/property-sidebar';

import elements from '../../things-scene-components-with-tools.import';

class BoardModeler extends ReduxMixin(PolymerElement) {
  constructor() {
    super();

    // https://webpack.js.org/guides/code-splitting/#dynamic-imports
    // 동적 임포트로 bundle splitting을 시도했으나, es2015 모듈에서는 안되는 듯.
    // import(
    //   /* webpackChunkName: "components-with-tools" */
    //   /* webpackMode: "lazy" */
    //   '../../things-scene-components-with-tools.import').then(elements => {
    //     this.dispatch({
    //       type: 'MODULE-PLUGIN',
    //       elements
    //     });
    //   }).catch(error => 'An error occurred while loading the component');

    this.dispatch({
      type: 'MODULE-PLUGIN',
      elements
    });
  }

  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
    `;
  }

  static get is() { return 'board-modeler'; }

  static get properties() {
    return {
      page: {
        statePath: 'route.page',
        observer: '_onPageChanged'
      },

      model: {
        type: Object,
        statePath: 'boardCurrent.model',
        observer: '_onModelChanged'
      },

      baseUrl: {
        type: String,
        statePath: 'route.rootPath'
      },

      selected: {
        type: Array,
        // observer: 'onSelectedChanged'
      },

      mode: {
        value: 1
      },

      provider: Object
    }
  }

  // onSelectedChanged(selected) {
  //   this.dispatch({
  //     type: 'CHANGE-SELECTED'
  //   })
  // }

  onOpenPreview() {
    this.previewModel = JSON.parse(JSON.stringify(this.scene.model));

    /*
     * paper-dialog appears behind backdrop when inside a <app-header-layout ..
     * https://github.com/PolymerElements/paper-dialog/issues/152
     **/

    var preview = document.createElement('board-preview');

    preview.style.width = '100%';
    preview.style.height = '100%';
    preview.style.margin = '0';
    preview.style.padding = '0';
    preview.model = this.previewModel;
    preview.provider = this.provider;

    var dialog = document.createElement('paper-dialog');

    dialog.style.width = '100%';
    dialog.style.height = '100%';
    dialog.setAttribute('with-backdrop', true);
    dialog.setAttribute('auto-fit-on-attach', true);
    dialog.setAttribute('always-on-top', true);
    dialog.addEventListener("iron-overlay-closed", () => {
      dialog.parentNode.removeChild(dialog);
    });

    dialog.appendChild(preview);
    document.body.appendChild(dialog);

    requestAnimationFrame(() => {
      dialog.open();
    })
  }

  onDownloadModel() {
    this.downloadModel()
  }

  onFullscreen() {
    togglefullscreen(this)
  }


  _onPageChanged(after, before) {

    if (before == 'modeler' && after !== 'modeler') {
      this.$model = null;
    }
  }

  _onModelChanged(after, before) {

    if (this.page !== 'modeler')
      return;

    this.$model = this.model;
  }
}

customElements.define(BoardModeler.is, BoardModeler);
