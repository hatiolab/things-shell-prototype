import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <things-editor-value-range range="{{rule.range}}"
                             key-type="[[type]]"
                             value-type="[[valueType]]">
  </things-editor-value-range>

@demo demo/index-editor-value-range-color.html
@demo demo/index-editor-value-range.html
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

      input,
      things-editor-color {
        width: 20%;
        margin: 3px 0 3px 3px;
      }

      things-editor-color {
        width: 38.5%;
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

      div > input[placeholder=value] {
        width: 36%;
      }

      div > things-editor-color.default-value {
        width: 62%;
      }

      div > things-editor-color.default-value::shadow input {
        width: 125px !important
      }

      div {
        border-bottom: 1px solid #c0c0c0;
      }

      div:last-child {
        border-bottom: none;
      }

      .record-action {
        @apply(--things-record-action-button);
      }
    </style>

    <template is="dom-repeat" items="{{_toArray(range)}}">
      <div data-record="">
        <input type="text" data-from="" placeholder="<=" value="{{item.from}}">
        <input type="text" data-to="" placeholder=">" value="{{item.to}}">

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
        <button class="record-action" on-tap="_delete" tabindex="-1">-</button>
      </div>
    </template>

    <div data-record-new="">
      <input type="text" data-from="" placeholder="<=" value="">
      <input type="text" data-to="" placeholder=">" value="">

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
      <button class="record-action" on-tap="_add" tabindex="-1">+</button>
    </div>

    <div data-record="">
      <input type="text" data-from="" data-default="" disabled="" value="default">
      <input type="text" data-to="" placeholder=">" value="" hidden="">

      <template is="dom-if" if="[[_isBooleanType(valueType)]]">
        <input type="checkbox" data-value="" checked="{{range.default::change}}" data-value-type\$="[[valueType]]">
      </template>
      <template is="dom-if" if="[[!_isBooleanType(valueType)]]">
        <template is="dom-if" if="[[_isColorType(valueType)]]">
          <things-editor-color data-value="" value="{{range.default}}" placeholder="value" tabindex="-1"></things-editor-color>
        </template>
        <template is="dom-if" if="[[!_isColorType(valueType)]]">
          <input type="text" data-value="" value="{{range.default}}" placeholder="value" class="default-value" data-value-type\$="[[valueType]]">
        </template>
      </template>
      <button class="record-action" on-tap="_sort">&gt;</button>
    </div>
`,

  is: 'things-editor-value-range',

  properties: {
    range: {
      type: Object,
      notify: true,
      value: {}
    },
    rangeType: {
      notify: true,
      value: 'number'
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
    if (input.hasAttribute('data-value')) {
      var dataList = div.querySelectorAll('[data-value]:not([hidden])')
      for (var i = 0; i < dataList.length; i++)
        if (dataList[i] !== input)
          dataList[i].value = value
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
    var newrange = {}
    for (var i = 0; i < records.length; i++) {
      var record = records[i]
      var from = record.querySelector('[data-from]').value
      var to = record.querySelector('[data-to]').value
      var inputs = record.querySelectorAll('[data-value]:not([style*="display: none"])')
      if (!inputs || inputs.length == 0)
        continue;
      var input = inputs[inputs.length - 1]
      var value
      if (input.type == 'checkbox')
        value = Boolean(input.checked)
      else
        value = input.value
      if (from) {
        if (from === 'default')
          newrange['default'] = value || (this.valueType == 'color' ? '#000000' : '')
        else
          newrange[`${from}~${to}`] = value
      }
    }
    this.set('range', newrange)
  },

  /* default를 제외한 range아이템들을 template(dom-repeat)용 배열로 변환하는 함수 */
  _toArray: function (range) {
    var array = []
    for (var key in range) {
      if (key == 'default')
        continue
      var fromto = key.split('~')
      array.push({
        from: fromto[0],
        to: fromto[1],
        value: range[key]
      })
    }
    return array
  },

  _sort: function (e) {
    var sorter = this.rangeType === 'number' ?
      function (a, b) {
        return parseFloat(b.from) < parseFloat(a.from)
      } :
      function (a, b) {
        return b.from < a.from
      }
    var range = this._toArray(this.range).sort(sorter).reduce(function (sum, i) {
      sum[`${i.from}~${i.to}`] = i.value
      return sum
    }, {})
    range.default = this.range.default
    this.set('range', range)
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
    record.querySelector('[data-from]').value = ''
    this._build()
  }
});
