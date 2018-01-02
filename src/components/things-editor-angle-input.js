import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom';

Polymer({
  is: 'things-editor-angle-input',
  _template: `
  <style>
    :host {
      display: inline-block;
    }
  </style>
  <slot id="content" on-change="_onChangeValue"></slot>
  `,
  properties: {
    /**
     * `radian`은 각도의 ragian값이다.
     */
    radian: {
      type: Number,
      notify: true,
      reflectToAttribute: true
    }
  },
  observers: [
    "_onChangeRadian(radian)"
  ],
  attached() {
    this._observer = dom(this).observeNodes(function(info) {
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
  get inputElement () {
    return this._inputElement;
  },
  _initSlottedInput: function() {
    this._inputElement = this.getEffectiveChildren()[0];
    if(!this._inputElement)
      return;
    this._inputElement.setAttribute('type', 'number');
    if(!this._inputElement.getAttribute('placeholder'))
      this._inputElement.setAttribute('placeholder', '°');
    this._onChangeRadian(this.radian);
  },
  _onChangeValue(e) {
    var degree = this.inputElement.value;
    if(isNaN(degree))
      this.set('radian', undefined);
    else
      this.set('radian', degree * (Math.PI / 180));
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }));
  },
  _onChangeRadian(radian) {
    if(!this.inputElement)
      return;
    /* 외부에서 바인딩된 변수의 값을 바꾼 경우 */
    if(isNaN(Number(radian))) {
      this.inputElement.value = undefined;
    } else {
      this.inputElement.value = Math.round(radian * 180 / Math.PI);
    }
  }
});
