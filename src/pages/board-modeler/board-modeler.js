import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-dialog/paper-dialog';

import { ReduxMixin } from '../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import { togglefullscreen } from '../../commons/utils';
import '../../commons/board-preview';
import '../../components/things-shell/things-shell';

import './edit-toolbar/edit-toolbar';
import './component-toolbar/component-toolbar';
import './property-sidebar/property-sidebar';

class BoardModeler extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    ${template}
    `;
  }

  static get is() { return 'board-modeler'; }

  static get properties() {
    return {
      model: {
        type: Object,
        statePath: 'boardCurrent.model'
      },

      baseUrl: {
        type: String,
        statePath: 'route.rootPath'
      },

      selected: {
        type: Array,
        observer: 'onSelectedChanged'
      },

      mode: {
        value: 1
      }
    }
  }

  onSelectedChanged(selected) {
    this.dispatch({
      type: 'CHANGE-SELECTED'
    })
  }

  onOpenPreview() {
    this.previewModel = JSON.parse(JSON.stringify(this.scene.model));

    /*
     * paper-dialog appears behind backdrop when inside a <app-header-layout
     * https://github.com/PolymerElements/paper-dialog/issues/152
     **/

    var preview = document.createElement('board-preview');

    preview.style.width = '100%';
    preview.style.height = '100%';
    preview.model = this.previewModel;
    preview.provider = this.provider;
    preview.fit = 'ratio';

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
}

customElements.define(BoardModeler.is, BoardModeler);
