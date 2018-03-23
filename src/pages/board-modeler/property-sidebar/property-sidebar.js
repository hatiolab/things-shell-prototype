import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';

import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior';
import '@polymer/neon-animation/animations/slide-right-animation';
import '@polymer/neon-animation/animations/slide-from-right-animation';

import '@polymer/paper-tabs/paper-tabs';

import { ReduxMixin } from '../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import './shapes/shapes';
import './styles/styles';
import './effects/effects';
import './specifics/specifics';
import './data-binding/data-binding';

class PropertySidebar extends mixinBehaviors([NeonAnimationRunnerBehavior, IronResizableBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
  `;
  }

  static get is() { return 'property-sidebar'; }

  static get properties() {
    return {
      scene: {
        type: Object
      },

      selected: {
        type: Array,
        observer: '_onSelectedChanged'
      },

      specificProps: {
        type: Array,
        notify: true,
        value: []
      },

      propertyTarget: {
        type: Object,
        observer: '_onPropertyTargetChanged'
      },

      current: {
        value: 0
      },

      collapsed: {
        type: Boolean,
        observer: '_onCollapsedChanged'
      },

      animationConfig: {
        value: function () {
          return {
            'entry': {
              name: 'slide-from-right-animation',
              node: this
            },
            'exit': {
              name: 'slide-right-animation',
              node: this
            }
          }
        }
      }
    }
  }

  static get observers() {
    return [
      '_onSceneChanged(scene)',
      '_onModelChanged(model.*)',
      '_onBoundsChanged(bounds.*)'
    ]
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('neon-animation-finish', this._onNeonAnimationFinish.bind(this));
  }

  _defaultPropertyTarget() {
    if (!this.scene) {
      this.propertyTarget = null
      this.set('specificProps', [])
      this.model = {}
      this.bounds = {}
    } else {
      this.propertyTarget = this.scene.root
      this.set('specificProps', this.scene.root.nature.properties)
      this.model = JSON.parse(JSON.stringify(this.propertyTarget.model))
      this._setBounds(this.propertyTarget.bounds)
    }
  }

  _onSceneChanged() {
    this._defaultPropertyTarget()
  }

  _onModelChanged(change) {

    /* 사용자가 선택한 컴포넌트가 바뀐 경우도 호출되므로, 이 경우는 제외한다. */
    if (!this.scene || change.path === 'model' || this.changedByScene)
      return

    var self = this

    if (this.propertyTarget) {
      this.scene.undoableChange(function () {
        self.propertyTarget.set(change.path.substr(6), change.value)
      })
      return
    }

    /* 여러 컴포넌트의 경우에 적용 */
    this.scene.undoableChange(function () {
      self.selected.forEach(function (component) {
        component.set(change.path.substr(6), change.value)
      })
    })
  }

  _onBoundsChanged(change) {
    /* 사용자가 선택한 컴포넌트가 바뀐 경우도 호출되므로, 이 경우는 제외한다. */
    if (change.path === 'bounds' || this.changedByScene)
      return

    var self = this

    if (this.propertyTarget) {
      this.scene.undoableChange(function () {
        self.propertyTarget.bounds = self.bounds
      })

      this.changedByScene = true
      this._setBounds(this.propertyTarget.bounds)
      this.changedByScene = false

      return
    }

    /* 여러 컴포넌트의 경우에 적용 */
    this.changedByScene = true

    var bounds = {}
    bounds[change.path.substr(7)] = change.value

    this.scene.undoableChange(function () {
      self.selected.forEach(function (component) {
        component.bounds = Object.assign({}, component.bounds, bounds)
      })
    })

    this.changedByScene = false
  }

  _onModelChangedB(after, before) {

    this.changedByScene = true

    for (var property in after) {
      if (property)
        this.set('model.' + property, after[property])
    }

    this._setBounds(this.propertyTarget.bounds)

    this.changedByScene = false
  }

  _onSelectedChanged(after, before) {

    this.changedByScene = true

    if (after.length == 1) {

      this.propertyTarget = after[0]
      // 컴포넌트 특성 속성(specific properties)을 먼저 바꾸고, 모델을 바꾸어준다.
      // 컴포넌트 속성에 따라 UI 컴포넌트가 준비되고, 이후에 모델값을 보여주도록 하기 위해서이다.
      this.set('specificProps', this.propertyTarget.nature.properties)
      this.model = JSON.parse(JSON.stringify(this.propertyTarget.model))
      this._setBounds(this.propertyTarget.bounds)

    } else if (after.length == 0) { // 선택이 안된 경우

      this._defaultPropertyTarget()
    } else { // 다중 선택된 경우

      var type = after[0].model.type;
      for (let i = 1; i < after.length; i++) {
        if (after[i].model.type != type) {
          type = undefined;
          break;
        }
      }

      this.propertyTarget = null

      if (type)
        this.set('specificProps', after[0].nature.properties);
      else
        this.set('specificProps', null)

      this.model = {
        type: type,
        alpha: 1
      }
      this.bounds = {}

    }

    this.changedByScene = false
  }

  _onPropertyTargetChanged(after, before) {
    if (before) {
      before.off('change', this._onModelChangedB, this)
    }
    if (after) {
      after.on('change', this._onModelChangedB, this)
    }
  }

  _setBounds(bounds) {
    this.bounds = {
      left: bounds.left,
      top: bounds.top,
      width: Math.round(bounds.width),
      height: Math.round(bounds.height)
    }
  }

  _onNeonAnimationFinish() {
    if (this.collapsed) {
      this.style.width = '0px';
    }

    this.notifyResize();
  }

  _onCollapsedChanged(collapsed) {
    if (collapsed) {
      /* to hide */
      this._backup_style_width = this.style.width;
      this.playAnimation('exit')
    } else {
      if (this._backup_style_width !== undefined) {
        this.style.width = this._backup_style_width;
        /* to show */
        this.playAnimation('entry');
      }
    }
  }

}

customElements.define(PropertySidebar.is, PropertySidebar);
