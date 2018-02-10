import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom';

Polymer({
  is: 'things-editor-number-input',

  _template: `
  <style>
    :host {
      display: inline-block;
    }
    ::slotted(input) {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      @apply(--things-editor-number-input);
    }
  </style>

  <slot id="content" on-change="_onChangeValue"></slot>
  `,

  properties: {
    number: {
      type: Number,
      notify: true,
      reflectToAttribute: true,
      observer: "_onChangeNumber"
    }
  },

  attached() {
    this._observer = dom(this).observeNodes(function (info) {
      this._initSlottedInput();
    }.bind(this));
  },

  detached() {
    if (this._observer) {
      dom(this).unobserveNodes(this._observer);
      this._observer = null;
    }
  },
  /**
   * Returns the distributed <input> element.
   */
  get inputElement() {
    return this._inputElement;
  },

  _initSlottedInput: function () {
    this._inputElement = this.getEffectiveChildren()[0];

    if (!this._inputElement)
      return;
    this._inputElement.setAttribute('type', 'number');

    this._onChangeNumber(this.number);
  },

  _onChangeNumber(number) {
    if (!this.inputElement)
      return;
    /* 외부에서 바인딩된 변수의 값을 바꾼 경우 */
    if (isNaN(Number(number))) {
      this.inputElement.value = NaN;
    } else {
      this.inputElement.value = Number(number);
    }
  },

  _onChangeValue(e) {
    e.stopPropagation();

    /* 에디터에서 값을 바꾼 경우 */
    var value = this.inputElement.valueAsNumber;
    if (isNaN(Number(value))) {
      this.number = NaN;
    } else {
      this.number = Number(value);
    }
    this.dispatchEvent(new CustomEvent('change', { bubbles: true }));
  }
});
