import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import '@polymer/app-layout/app-grid/app-grid-style';

import {ReduxMixin, fetchSceneList} from '../../reducer/redux-mixin';
import '@polymer/iron-icons/iron-icons';
import {AppLocalizeBehavior} from '../../components/app-localize-behavior';

import style from './style.css';

import '../../layouts/page-toolbar/page-toolbar';
import './scene-card';

class SceneList extends mixinBehaviors([AppLocalizeBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return `
    <style include="app-grid-style"></style>
    <style include="shared-styles">${style}</style>

    <page-toolbar>
      <iron-icon icon="icons:search"></iron-icon>
      <paper-input label="[[localize('keyword')]]" value="{{keyword::change}}" no-label-float></paper-input>
    </page-toolbar>

    <div class="app-grid">
      <scene-card name='+' add>Click to add new scene.</scene-card>
      <template is="dom-repeat" items="[[_toArray(sceneList)]]">
        <scene-card name="[[item.name]]" sequence="[[index]]">[[item.value.description]]</scene-card>
      </template>
    </div>
    `;
  }

  static get is() { return 'scene-list'; }

  static get properties() {
    return {
      sceneList: {
        type: Object,
        statePath: 'sceneList'
      },
      selected: {
        type: Number,
        value: 0
      },
      language: {
        statePath: 'user.language'
      },
      resources: {
        statePath: 'resource'
      },
    }
  }

  ready() {
    super.ready();

    this.shadowRoot.addEventListener('click', e => {
      var card = e.target;
      if(card.tagName !== 'SCENE-CARD')
        return;

      this.dispatch({
        type: 'SHOW-SCENE-MODELER',
        scene: '101'
      })
    })

    this.dispatch(fetchSceneList());
  }

  _toArray(obj) {
    return Object.keys(obj).map(function(key) {
      return {
        name: key,
        value: obj[key]
      };
    });
  }
}

customElements.define(SceneList.is, SceneList);
