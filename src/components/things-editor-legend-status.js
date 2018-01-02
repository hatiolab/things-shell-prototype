import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <things-editor-legend-status value="{{status}}">
  </things-editor-legend-status>

@demo demo/index-editor-stock-_status.html
@hero hero.svg
*/
Polymer({
  _template: `
  <style>
    :host {
      /* @apply(--things-variable-ruletype-container) */
      display: block;
    }
    label {
        @apply(--things-label);
    }

    input {
      @apply(--things-input);
    }
    div{
      border-bottom:1px solid #c0c0c0;
      width:100%;
    }

    div.no-border-bottom {
      border-bottom:none;
    }

    .record-action{
      @apply(--things-record-action-button)
    }
    div[data-record] input {
      width: 20%;
    }
    table{
      width:93.5%;
      margin:7px 0 7px 7px;
    }
    table input{
      width:44px;
      margin:3px 0 2px 0;
    }
    table td span{
      float:left;
      padding:5px 0 0 0;
    }
    table td things-editor-color{
      width:100px
    }
    table things-editor-color ::shadow input{
      width:85%;height:17px;
      margin:3px 0 2px 0;
      font-size:12px;
    }
    table things-editor-color ::shadow #color{
      top:2px;
      margin-top:0px;
    }
    table td button{
      margin-left:0
    }
    table th{
      background-color:rgba(0,0,0,.1);
      padding:2px 0;
      text-align:center;
    }
    table *.things-editor-legend-status{
      float:none !important
    }
    table td{
      border-bottom:1px solid rgba(0,0,0,.1);
    }
    table tr.stock-new{
      background-color:rgba(179,145,117,.3);
    }
  </style>

    <legend>
      <things-i18n-msg msgid="label.status" auto="">Status</things-i18n-msg>
    </legend>

    <div data-field="" class="no-border-bottom">
      <label class="stock-field">
        <things-i18n-msg msgid="label.field" auto="">Field</things-i18n-msg>
      </label>
      <input type="text" value="{{_statusField::change}}">
    </div>
    <div class="no-border-bottom">
      <label class="default-color">
        <things-i18n-msg msgid="label.default-color" auto="">Default Color</things-i18n-msg>
      </label>
      <things-editor-color name="default-color" value="{{_defaultColor::change}}" placeholder="default color"></things-editor-color>
    </div>
    <table>
      <tbody><tr>
        <th>value ≤ Field &lt; value</th>
        <th>color</th>
      </tr>
    <template id="range-repeater" is="dom-repeat" items="[[_ranges]]">
      <tr data-record="">
        <td>
          <input type="text" data-min="" placeholder="min" value="[[item.min]]">
          <span>~</span>
          <input type="text" data-max="" placeholder="max" value="[[item.max]]">
        </td>
        <td>
          <things-editor-color data-color="" value="[[item.color]]" placeholder="color"></things-editor-color>
          <button class="record-action" on-tap="_delete" tabindex="-1">-</button>
        </td>
      </tr>
    </template>

    <tr data-record-new="" class="stock-new">
      <td>
          <input type="text" data-min="" placeholder="min" value="">
          <span>~</span>
          <input type="text" data-max="" placeholder="max" value="">
      </td>
      <td>
          <things-editor-color data-color="" value="" placeholder="color"></things-editor-color>
          <button class="record-action" on-tap="_add" tabindex="-1">+</button>
      </td>
    </tr>
  </tbody></table>

  <!-- <template id="range-repeater" is="dom-repeat" items="[[_ranges]]">
      <div data-record>
        <input type="text" data-min placeholder="min" value="[[item.min]]"/>
        <span>&le;</span>
        <span>Field</span>
        <span>&lt;</span>
        <input type="text" data-max placeholder="max" value="[[item.max]]"/>
        <things-editor-color data-color value="[[item.color]]" placeholder="color"></things-editor-color>
        <button class="record-action" on-tap="_delete" tabindex="-1">-</button>
      </div>
    </template>

    <div data-record-new>
      <input type="text" data-min placeholder="min" value=""/>
      <input type="text" data-max placeholder="max" value=""/>
      <things-editor-color data-color value="" placeholder="color"></things-editor-color>
      <button class="record-action" on-tap="_add" tabindex="-1">+</button>
    </div> -->
`,

  is: 'things-editor-legend-status',

  properties: {
    value: {
      type: Object,
      observer: '_valueChanged',
      value: function() {
        return null
      },
      notify: true
    },
    _statusField: {
      type: String
    },
    _defaultColor: {
      type: String
    },
    _ranges: {
      type: Array
    }
  },

  attached: function () {
    if(!this.boundOnChange)
      this.boundOnChange = this._onChange.bind(this);

    this.addEventListener('change', this.boundOnChange);
    this.$['range-repeater'].addEventListener('dom-change', this._onRepeaterChanged.bind(this));
  },

  detached: function () {
    this.removeEventListener('change', this.boundOnChange);
  },

  _valueChanged: function(value) {
    var val = value || this._getDefaultValue();
    this.set('_statusField', val.field);
    this.set('_defaultColor', val.defaultColor);
    this.set('_ranges', val.ranges);
  },

  _onChange: function(e) {

    this._changingNow = true

    var input = e.target
    var value = input.value

    var tr = input.closest('tr')

    if(tr) {
      // if(tr.hasAttribute('data-field')) {
      //   this.set('_statusField', value);
      // } else
      if(tr.hasAttribute('data-record'))
        this._build(true)
      else if(tr.hasAttribute('data-record-new') && input.hasAttribute('data-color'))
        this._add()
    }

    this.set('value', {
      field: this.get('_statusField'),
      defaultColor: this.get('_defaultColor'),
      ranges: this.get('_ranges')
    });

  },

  _build: function(includeNewRecord, isDelete) {
    if(includeNewRecord)
      var records = this.querySelectorAll('[data-record],[data-record-new]')
    else
      var records = this.querySelectorAll('[data-record]')

    var newRanges = []

    for(var i = 0;i < records.length;i++) {
      var record = records[i]

      var min = record.querySelector('[data-min]').value
      var max = record.querySelector('[data-max]').value
      var inputs = record.querySelectorAll('[data-color]:not([style*="display: none"])')
      if(!inputs || inputs.length == 0)
        continue;

      var input = inputs[inputs.length - 1]
      var color = input.value

      if(min != undefined && max != undefined && color)
        newRanges.push({min: min.trim(), max: max.trim(), color: color.trim()})
    }

    newRanges.sort(function(range1, range2) {
      var min1 = range1.min;
      var min2 = range2.min;

      var result = min1 - min2

      if(Number.isNaN(result)) {
        var strMin1 = String(min1)
        var strMin2 = String(min2)

        if(strMin1 > strMin2)
          result = 1
        else if(strMin1 == strMin2)
          result = 0;
        else
          result = -1;
      }

      return result;
    })

    this.set('_ranges', newRanges);
  },

  _add: function(e) {
    this._build(true)

    var inputs = this.querySelectorAll('[data-record-new] input:not([style*="display: none"])')

    for (var i = 0;i < inputs.length;i++) {
      let input = inputs[i]
      input.value = ''
    }
  },

  _delete: function(e) {
    var record = e.target.closest('tr[data-record]')
    record.querySelector('[data-min]').value = ''
    record.querySelector('[data-max]').value = ''
    record.querySelector('[data-color]').value = ''
    this._build(false)
    this.fire('change')
  },

  _getDefaultValue: function() {
    return {
      field: '',
      defaultColor: '',
      ranges: []
    }
  },

  _onRepeaterChanged: function() {
    var inputs = this.querySelectorAll('[data-record] input:not([style*="display: none"])[value=""], [data-record-new] input:not([style*="display: none"])[value=""]');
    inputs[0].focus();
  }
});
