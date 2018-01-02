import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import {ReduxMixin} from '../../reducer/redux-mixin';

import style from './style.css';

class ScenePlayer extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">${style}</style>

    <app-toolbar>
      <paper-icon-button icon="undo"></paper-icon-button>
      <paper-icon-button icon="redo"></paper-icon-button>
      <paper-icon-button icon="av:volume-up"></paper-icon-button>
      <paper-icon-button icon="cloud-queue"></paper-icon-button>
      <paper-icon-button icon="device:brightness-medium"></paper-icon-button>
      <paper-icon-button icon="maps:local-movies"></paper-icon-button>
      <paper-icon-button icon="social:people"></paper-icon-button>
      <paper-icon-button icon="image:landscape"></paper-icon-button>
      <paper-icon-button icon="social:person-add"></paper-icon-button>
      <paper-icon-button icon="social:person-outline"></paper-icon-button>
    </app-toolbar>
    `;
  }

  static get is() { return 'scene-player'; }

  static get properties() {
    return {
    }
  }
}

customElements.define(ScenePlayer.is, ScenePlayer);
