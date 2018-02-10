import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/paper-button/paper-button';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
여러 버튼 중에서 하나만 눌리거나, 모두 눌리지 않은 상태만을 갖는 라디오 형태의 버튼이다.

Example:

  <things-editor-buttons-radio value="{{value}}">
    <paper-button data-value="top"></paper-button>
    <paper-button data-value="middle"></paper-button>
    <paper-button data-value="bottom"></paper-button>
  </things-editor-buttons-radio>

@demo demo/index-editor-buttons-radio.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      :host {
        display: inline-block;
      }

      ::slotted(paper-button) {
        @apply(--things-editor-buttons-radio-button)
      }
    </style>

    <slot select="paper-button"></slot>
`,

  is: 'things-editor-buttons-radio',

  properties: {
    /**
     * `value`는 버튼의 눌린 상태를 값으로 갖는 속성이다.
     */
    value: {
      type: Object,
      notify: true,
      observer: '_onValueChanged'
    },

    mandatory: {
      type: Boolean
    }
  },

  listeners: {
    'tap': "_onTapButton"
  },

  ready: function () {
    if (!this.mandatory) {
      Array.from(this.querySelectorAll('paper-button')).forEach(function (button) {
        button.toggleAttribute('toggles', true)
      })
    }
  },

  _onValueChanged: function (value) {

    Array.from(this.querySelectorAll('paper-button')).forEach(function (button) {
      if (value === button.getAttribute('data-value'))
        button.active = true
      else
        button.active = false
    })
  },

  _onTapButton: function (e) {
    var target = e.target;

    while (!target.hasAttribute('data-value') && target !== this)
      target = target.parentElement;

    if (target === this)
      return;

    var old = this.value

    if (!this.mandatory) {
      if (target.active)
        this.value = target.getAttribute('data-value')
      else
        this.value = null
    } else {
      this.value = target.getAttribute('data-value')
      target.active = true
    }

    if (old !== this.value)
      this.fire('change', this.value)
  }
});
