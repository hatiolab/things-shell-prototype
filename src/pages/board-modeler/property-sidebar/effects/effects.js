import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-image/iron-image';

import { ReduxMixin } from '../../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import { deepClone } from '../../../../commons/utils';
import '../../../../components/things-i18n-msg';
import '../../../../components/things-editor-buttons-radio';
import '../../../../components/things-editor-number-input';
import '../../../../components/things-editor-angle-input';
import '../../../../components/things-editor-shadow';
import '../../../../components/things-editor-animation';

class PropertyEffects extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
  `;
  }

  static get is() { return 'property-effect'; }

  static get properties() {
    return {
      model: {
        notify: true
      },
      animation: {
        type: Object,
        value() {
          return {}
        }
      },
      event: {
        type: Object,
        value() {
          return {
            hover: {},
            tap: {}
          }
        }
      }
    }
  }

  static get observers() {
    return [
      'onModelChanged(model)',
      'onAnimationChanged(animation.*)',
      'onEventChanged(event.*)',
      'onShadowChanged(shadow.*)'
    ]
  }

  ready() {
    super.ready();

    this.$['hover-select'].addEventListener('click', e => {
      this.onOpenSelect(e);
    });

    this.$['tap-select'].addEventListener('click', e => {
      this.onOpenSelect(e);
    });
  }

  onOpenSelect() {
    this.variables = this.scene && this.scene.ids
  }

  onModelChanged(model) {
    if (model) {
      this.animation = Object.assign({
        oncreate: {}
      }, model.animation)

      this.event = Object.assign({
        hover: {},
        tap: {}
      }, model.event)

      this.shadow = Object.assign({}, model.shadow)
    }
  }

  onShadowChanged(change) {
    if (change.path == 'shadow')
      return

    this.set('model.shadow', Object.assign({}, this.shadow))
  }

  onAnimationChanged(change) {
    if (change.path == 'animation')
      return

    // for(var key in this.animation) {
    //   var anim = this.animation[key]
    //   this._setDefaults(anim);
    // }

    this.set('model.animation', deepClone(this.animation))
  }

  onEventChanged(change) {
    if (change.path == 'event')
      return

    this.set('model.event', deepClone(this.event))

  }

  // _setDefaults(animType) {
  //   switch(animType) {
  //     case 'rotation' :
  //       anim.type = 'rotation'
  //       break;
  //     case 'vibration' :
  //       anim.type = 'vibration';
  //       break;
  //     case 'heartbeat' :
  //       anim.type = 'heartbeat';
  //       break;
  //     case 'moving' :
  //       anim.type = 'moving'
  //       break;
  //     case 'outline' :
  //       anim.type = 'outline';
  //       break;
  //     default:
  //       for(var key in anim) {
  //         delete anim[key]
  //       }
  //       break;
  //   }
  // }

  _isTypeOf(value, type) {
    if (value == type)
      return true
  }

  _getPlaceholder(target) {
    var placeholder = ""
    switch (target) {
      case 'goto':
      case 'popup':
        placeholder = "SCENE-100"
        break;
      case 'link-open':
      case 'link-href':
        placeholder = "http://www.hatiolab.com"
        break;
    }

    return placeholder
  }

  _is(a, b) {
    return a == b
  }
}

customElements.define(PropertyEffects.is, PropertyEffects);
