import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';

Polymer({
  is: 'things-editor-angle-select',
  extends: 'select',

  properties: {
    /**
     * `value`는 각도의 degree값으로 input element의 입력값과 연동된다.
     */
    value: {
      type: String,
      notify: true,
      reflectToAttribute: true
    },

    /**
     * `radian`은 각도의 ragian값이다.
     */
    radian: {
      type: Number,
      notify: true
    }
  },

  listeners: {
    'change': "_onChangeValue"
  },

  observers: [
    "_onChangeDegree(value)",
    "_onChangeRadian(radian)"
  ],

  created() {
    if (!this.getAttribute('placeholder'))
      this.setAttribute('placeholder', '°')
  },

  _onChangeValue(e) {
    this.set('value', this.options[this.selectedIndex].value)
  },

  _onChangeRadian(radian) {
    if (this._dont_loop)
      return

    var PI_2 = Math.PI * 2
    var value = (((radian % PI_2) + PI_2) % PI_2) * 180 / Math.PI

    var nearest_option = -1
    var diff

    Array.from(this.options).forEach(function (option, index) {
      let gap = Math.abs(Number(value) - Number(option.value)) % 360
      if (gap > 180)
        gap = 360 - gap

      if (nearest_option == -1) {
        nearest_option = index
        diff = gap
        return
      }

      if (diff > gap) {
        nearest_option = index
        diff = gap
      }
    })

    this.selectedIndex = nearest_option
    this.set('value', this.options[this.selectedIndex].value)
  },

  _onChangeDegree(degree) {
    this._dont_loop = true
    this.set('radian', degree * (Math.PI / 180))
    this._dont_loop = false
  }
});
