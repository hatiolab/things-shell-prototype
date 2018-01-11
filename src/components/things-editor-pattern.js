import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';

import './things-i18n-msg';
import './things-editor-number-input';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

    <things-editor-pattern image="{{pattern.image}}"
                           offset-x="{{pattern.offsetX}}"
                           offset-y="{{pattern.offsetY}"
                           width="{{pattern.width}}"
                           height="{{pattern.height}}"
                           fit-pattern="{{pattern.fit}}">
    </things-editor-pattern>

@demo demo/index-editor-pattern.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        display: block;
      }

      label {
        @apply(--things-label);
      }

      input {
        @apply(--things-input);
      }

      select {
        @apply(--things-select);
        width: 65%;
        background: url(./assets/images/bg-input-select.png) 100% 50% no-repeat #fff;
      }

      div * {
        float: left;
      }

      div > label {
        width: 18%;
        margin-right: 3px;
        top: 4px;
      }

      div > input {
        width: 24%;
      }

      things-editor-number-input {
        width: 30%;
      }

      input[type="checkbox"] {
        width: 15px;
        margin-left: 53px;
      }
    </style>

    <label><things-i18n-msg msgid="label.image" auto="">image</things-i18n-msg></label>

    <input type="text" value="{{image::change}}"></input>

    <label><things-i18n-msg msgid="label.align" auto="">align</things-i18n-msg></label>

    <select class="select-content" value="{{align::change}}">
      <option value="left-top">Left Top</option>
      <option value="top">Top</option>
      <option value="right-top">Right Top</option>
      <option value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
      <option value="left-bottom">Left Bottom</option>
      <option value="bottom">Bottom</option>
      <option value="right-bottom">Right Bottom</option>
    </select>

    <div>
      <label><things-i18n-msg msgid="label.offset-x" auto="">offsetX</things-i18n-msg></label>
      <things-editor-number-input number="{{offsetX::change}}">
        <input>
      </things-editor-number-input>
      <label><things-i18n-msg msgid="label.offset-y" auto="">offsetY</things-i18n-msg></label>
      <things-editor-number-input number="{{offsetY::change}}">
        <input>
      </things-editor-number-input>
      <label><things-i18n-msg msgid="label.width" auto="">width</things-i18n-msg></label>
      <things-editor-number-input number="{{width::change}}">
        <input>
      </things-editor-number-input>
      <label><things-i18n-msg msgid="label.height" auto="">height</things-i18n-msg></label>
      <things-editor-number-input number="{{height::change}}">
        <input>
      </things-editor-number-input>
    </div>

    <input type="checkbox" checked="{{fitPattern::change}}" required="">
    <things-i18n-msg msgid="label.fit" auto="">Fit</things-i18n-msg>
`,

  is: 'things-editor-pattern',

  properties: {

    image: {
      type: String,
      notify: true
    },

    offsetX: {
      type: Number,
      notify: true
    },

    offsetY: {
      type: Number,
      notify: true
    },

    width: {
      type: Number,
      notify: true
    },

    height: {
      type: Number,
      notify: true
    },

    align: {
      type: String,
      notify: true
    },

    fitPattern: {
      type: Boolean,
      notify: true
    }
  }
});
