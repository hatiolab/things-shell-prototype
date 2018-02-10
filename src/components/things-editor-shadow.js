import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/iron-pages/iron-pages';

import './things-i18n-msg';
import './things-editor-color';
import './things-editor-number-input';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
컴포넌트의 그림자를 주는 속성이다.

Example:

    <things-editor-shadow value={{shadow}}>
    </things-editor-shadow>

@demo demo/index-editor-shadow.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        @apply(--things-editor-shadow)

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

      :host > things-editor-number-input, :host > things-editor-color {
        grid-column: span 7;
      }

      paper-radio-button {
        padding: 2px 1px 10px 7px !important;
      }

      .icon-only-label {
        @apply(--things-properties-icon-only-label);
        float: left;
        margin-top: 2px;
        margin-left: 40px;
      }

      .icon-only-label.color {
        background-position: 70% -498px;
      }

    </style>

    <label>
      <things-i18n-msg msgid="label.shadowOffsetX" auto="">offset-X</things-i18n-msg>
    </label>
    <things-editor-number-input id="left" number="{{shadow.left::change}}">
      <input>
    </things-editor-number-input>

    <label>
      <things-i18n-msg msgid="label.shadowOffsetY" auto="">offset-Y</things-i18n-msg>
    </label>
    <things-editor-number-input id="top" number="{{shadow.top::change}}">
      <input>
    </things-editor-number-input>

    <label>
      <things-i18n-msg msgid="label.shadowSize" auto="">Size</things-i18n-msg>
    </label>
    <things-editor-number-input id="blurSize" number="{{shadow.blurSize::change}}">
      <input>
    </things-editor-number-input>

    <label class="icon-only-label color"></label>
    <things-editor-color id="color" value="{{shadow.color::change}}">
    </things-editor-color>
`,

  is: 'things-editor-shadow',

  properties: {
    value: {
      notify: true
    }
  },

  observers: [
    'onChangedShadow(shadow.*)',
    'onChangedValue(value)'
  ],

  onChangedValue: function (changed) {

    if (this.changedOnThis)
      return;

    var value = changed;

    if (!value) {
      this.shadow = {};
      return;
    }

    this.shadow = Object.assign({}, value);
  },

  onChangedShadow: function (changed) {
    this.changedOnThis = true

    var name = changed.path
    var value = changed.value

    switch (name) {
      case 'shadow.left':
        this.set('value.left', value)
        break;
      case 'shadow.top':
        this.set('value.top', value)
        break;
      case 'shadow.color':
        this.set('value.color', value)
        break;
      case 'shadow.blurSize':
        this.set('value.blurSize', value)
        break;
    }

    this.changedOnThis = false
  }
});
