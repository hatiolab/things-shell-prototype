import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import './things-editor-color';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <things-editor-value-map map="{{rule.map}}"
                           key-type="[[type]]"
                           value-type="[[valueType]]">
  </things-editor-value-map>

@demo demo/index-editor-value-map-color.html
@demo demo/index-editor-value-map.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        @apply(--things-variable-ruletype-container)
      }

      * {
        float: left;
      }

      input, things-editor-color {
        width: 41%;
        margin: 3px 0 3px 3px;
      }

      things-editor-color {
        --things-editor-color-input-text: {
          border-radius: 0;
          margin-bottom: 0;
          padding: 1px 3px 1px 3px;
          font-size: 12px
        };
        --things-editor-color-input-color: {
          margin: 2px;
        };
        --things-editor-color-input-span: {
          width: 12px;
          height: 12px;
        };
      }

      input[type="checkbox"] {
        width: initial !important;
        margin-top: 6px;
      }

      div {
        border-bottom: 1px solid #c0c0c0;
        width: 100%;
      }

      div:last-child {
        border-bottom: none;
      }

      .record-action {
        @apply(--things-record-action-button)
      }
    </style>

    <template is="dom-repeat" items="{{_toArray(map)}}">
      <div data-record="">
        <input type="text" data-key="" placeholder="key" value="{{item.key}}">
        <template is="dom-if" if="[[_isBooleanType(valueType)]]">
          <input type="checkbox" data-value="" checked="{{item.value::change}}" data-value-type\$="[[valueType]]">
        </template>
        <template is="dom-if" if="[[!_isBooleanType(valueType)]]">
          <template is="dom-if" if="[[_isColorType(valueType)]]">
            <things-editor-color data-value="" value="{{item.value}}" tabindex="-1"></things-editor-color>
          </template>
          <template is="dom-if" if="[[!_isColorType(valueType)]]">
            <input type="text" data-value="" placeholder="value" value="{{item.value}}" data-value-type\$="[[valueType]]">
          </template>
        </template>
        <button class="record-action" on-click="_delete" tabindex="-1">-</button>
      </div>
    </template>

    <div data-record-new="">
      <input type="text" data-key="" placeholder="key" value="">
      <template is="dom-if" if="[[_isBooleanType(valueType)]]">
        <input type="checkbox" data-value="" data-value-type\$="[[valueType]]">
      </template>
      <template is="dom-if" if="[[!_isBooleanType(valueType)]]">
        <template is="dom-if" if="[[_isColorType(valueType)]]">
          <things-editor-color data-value="" value="" tabindex="-1" placeholder="value"></things-editor-color>
        </template>
        <template is="dom-if" if="[[!_isColorType(valueType)]]">
          <input type="text" data-value="" placeholder="value" value="" data-value-type\$="[[valueType]]">
        </template>
      </template>
      <button class="record-action" on-click="_add" tabindex="-1">+</button>
    </div>

    <div data-record="">
      <input type="text" data-key="" value="default" disabled="">
      <template is="dom-if" if="[[_isBooleanType(valueType)]]">
        <input type="checkbox" data-value="" checked="{{map.default::change}}" data-value-type\$="[[valueType]]">
      </template>
      <template is="dom-if" if="[[!_isBooleanType(valueType)]]">
        <template is="dom-if" if="[[_isColorType(valueType)]]">
          <things-editor-color data-value="" value="{{map.default}}" placeholder="value" tabindex="-1"></things-editor-color>
        </template>
        <template is="dom-if" if="[[!_isColorType(valueType)]]">
          <input type="text" data-value="" placeholder="value" value="{{map.default}}" data-value-type\$="[[valueType]]" >
        </template>
      </template>
      <button class="record-action" on-click="_sort" tabindex="-1">&gt;</button>
    </div>
`,

  is: 'things-editor-value-map',

  properties: {
    map: {
      type: Object,
      notify: true,
      value: {}
    },
    keyType: {
      notify: true,
      value: 'string'
    },
    valueType: {
      notify: true,
      value: 'string'
    }
  },

  attached: function() {
    this.root.addEventListener('change', this._onChange.bind(this));
  },

  _isColorType: function (type) {
    return type === 'color'
  },

  _isBooleanType: function (type) {
    return type === 'boolean'
  },

  _defaultValue: function (type) {
    switch (type || this.valueType) {
      case 'color':
        return '#000000';
      case 'boolean':
      case 'checkbox':
        return false;
      default:
        return ''
    }
  },

  _onChange: function (e) {

    if (this._changingNow)
      return

    this._changingNow = true

    var input = e.target
    var value

    if (input.type == 'checkbox')
      value = Boolean(input.checked)
    else
      value = input.value

    var div = input.parentElement

    // if(input.hasAttribute('data-value')) {
    if (div.hasAttribute('data-record')) {
      var dataList = div.querySelectorAll('[data-value]:not([hidden])')
      for (var i = 0; i < dataList.length; i++)
        if (dataList[i] !== input)
          dataList[i].value = value || this._defaultValue()
    }

    if (div.hasAttribute('data-record'))
      this._build()
    else if (div.hasAttribute('data-record-new') && input.hasAttribute('data-value'))
      this._add()

    e.stopPropagation()

    this._changingNow = false
  },

  _build: function (includeNewRecord) {
    if (includeNewRecord)
      var records = this.root.querySelectorAll('[data-record],[data-record-new]')
    else
      var records = this.root.querySelectorAll('[data-record]')

    var newmap = {}

    for (var i = 0; i < records.length; i++) {
      var record = records[i]

      var key = record.querySelector('[data-key]').value
      var inputs = record.querySelectorAll('[data-value]:not([style*="display: none"])')
      if (!inputs || inputs.length == 0)
        continue;

      var input = inputs[inputs.length - 1]

      var value

      if (input.type == 'checkbox')
        value = Boolean(input.checked)
      else
        value = input.value

      if (key)
        newmap[key] = value || this._defaultValue()
    }

    this.set('map', newmap)
  },

  /* default를 제외한 map아이템들을 template(dom-repeat)용 배열로 변환하는 함수 */
  _toArray: function (map) {
    var array = []

    for (var key in map) {
      if (key == 'default')
        continue
      array.push({
        key: key,
        value: map[key]
      })
    }

    return array
  },

  _sort: function (e) {

    var sorter = this.keyType === 'number' ?
      function (a, b) {
        return parseFloat(b.key) < parseFloat(a.key)
      } :
      function (a, b) {
        return b.key < a.key
      }

    var map = this._toArray(this.map).sort(sorter).reduce(function (sum, i) {
      sum[i.key] = i.value
      return sum
    }, {})

    map.default = this.map.default

    this.set('map', map)
  },

  _add: function (e) {
    this._build(true)

    var inputs = this.root.querySelectorAll('[data-record-new] input:not([style*="display: none"])')

    for (var i = 0; i < inputs.length; i++) {
      let input = inputs[i]

      if (input.type == 'checkbox')
        input.checked = false
      else
        input.value = this._defaultValue(input.type)
    }

    inputs[0].focus()
  },

  _delete: function (e) {
    var record = e.target.parentElement
    record.querySelector('[data-key]').value = ''
    this._build()
  }
});
