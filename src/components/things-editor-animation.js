import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/iron-pages/iron-pages';

import './things-i18n-msg';
import './things-editor-number-input';
import './things-editor-value';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
컴포넌트의 그림자를 주는 속성이다.

Example:

    <things-editor-animation value={{animation}}>
    </things-editor-animation>

@demo demo/index-editor-animation.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      :host {
        @apply(--things-editor-animation)

        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
        grid-auto-rows: minmax(24px, auto);
      }

      :host > * {
        line-height: 1.5;
      }

      :host > label {
        grid-column: span 3;
        text-align: right;
        text-transform: capitalize;
      }

      :host > input, :host > things-editor-number-input, :host > things-editor-angle-input, :host > things-editor-color {
        grid-column: span 7;
      }

    </style>

    <label><things-i18n-msg msgid="label.waiting-time" auto>waiting time</things-i18n-msg></label>
    <things-editor-number-input number="{{animation.delay::change}}" placeholder="ms">
      <input>
    </things-editor-number-input>

    <label><things-i18n-msg msgid="label.duration" auto>duration</things-i18n-msg></label>
    <things-editor-number-input number="{{animation.duration::change}}" placeholder="ms">
      <input>
    </things-editor-number-input>

    <template is='dom-if' if='[[_isRotation(value.type)]]'>
      <label><things-i18n-msg msgid="label.theta" auto>theta</things-i18n-msg></label>
      <things-editor-angle-input radian="{{animation.theta::change}}">
        <input>
      </things-editor-angle-input>
    </template>

    <template is='dom-if' if='[[_isVibration(value.type)]]'>
      <label><things-i18n-msg msgid="label.theta" auto>theta</things-i18n-msg></label>
      <things-editor-angle-input radian="{{animation.theta::change}}">
        <input>
      </things-editor-angle-input>
    </template>

    <template is='dom-if' if='[[_isHeartbeat(value.type)]]'>
      <label><things-i18n-msg msgid="label.scale" auto>scale</things-i18n-msg></label>
      <things-editor-number-input number="{{animation.scale::change}}">
        <input>
      </things-editor-number-input>
    </template>

    <template is='dom-if' if='[[_isMoving(value.type)]]'>
      <label><things-i18n-msg msgid="label.x-axes" auto>X-axes</things-i18n-msg></label>
      <things-editor-number-input number="{{animation.x::change}}">
        <input>
      </things-editor-number-input>

      <label><things-i18n-msg msgid="label.y-axes" auto>Y-axes</things-i18n-msg></label>
      <things-editor-number-input number="{{animation.y::change}}">
        <input>
      </things-editor-number-input>
    </template>

    <template is='dom-if' if='[[_isFade(value.type)]]'>
      <label><things-i18n-msg msgid="label.start-alpha" auto>start alpha</things-i18n-msg></label>
      <things-editor-number-input number="{{animation.startAlpha::change}}">
        <input>
      </things-editor-number-input>

      <label><things-i18n-msg msgid="label.end-alpha" auto>end alpha</things-i18n-msg></label>
      <things-editor-number-input number="{{animation.endAlpha::change}}">
        <input>
      </things-editor-number-input>
    </template>

    <template is='dom-if' if='[[_isOutline(value.type)]]'>
      <label><things-i18n-msg msgid="label.target" auto>target</things-i18n-msg></label>
      <input required value="{{animation.rideOn::change}}">
    </template>

    <label><things-i18n-msg msgid="label.repeat" auto>repeat</things-i18n-msg></label>
    <input type="checkbox" checked="{{animation.repeat::change}}"></input>
  `,

  is: 'things-editor-animation',

  properties: {
    value: {
      notify: true
    }
  },

  observers: [
    'onChangedAnimation(animation.*)',
    'onChangedValue(value)'
  ],

  onChangedValue: function (changed) {
    if (this.changedOnThis)
      return

    var value = changed

    if (!value) {
      this.animation = {}
      return
    }

    this.animation = Object.assign({}, value);
  },

  onChangedAnimation: function (changed) {
    if (changed.path.indexOf('animation.') !== 0)
      return

    this.changedOnThis = true

    var prop = changed.path.substr(10)
    this.set('value.' + prop, changed.value)

    this.changedOnThis = false
  },

  _isOutline: function (type) {
    return type == 'outline'
  },

  _isRotation: function (type) {
    return type == 'rotation'
  },

  _isVibration: function (type) {
    return type == 'vibration'
  },

  _isHeartbeat: function (type) {
    return type == 'heartbeat'
  },

  _isMoving: function (type) {
    return type == 'moving'
  },

  _isFade: function (type) {
    return type == 'fade'
  }
});
