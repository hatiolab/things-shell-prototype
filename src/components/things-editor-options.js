import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <things-editor-options options="{{options}}">
  </things-editor-options>

@demo demo/index-editor-options.html
@hero hero.svg
*/
Polymer({
  _template: `
  <style>
    :host {
      /* @apply(--things-variable-ruletype-container) */
    }
    *{float:left;}

    input[type="checkbox"]{
      width:initial !important;
      margin-top:6px;
    }
    div{
      border-bottom:1px solid #c0c0c0;
      width:100%;
    }
    div:last-child{
      border-bottom:none;
    }
    .record-action{
      @apply(--things-record-action-button)
    }

  </style>

  <template is="dom-repeat" items="[[options]]">
    <div data-record="">
      <input type="text" data-text="" placeholder="text" value="[[item.text]]">
      <input type="text" data-value="" placeholder="value" value="[[item.value]]">
      <button class="record-action" on-click="_delete" tabindex="-1">-</button>
    </div>
  </template>

  <div data-record-new="">
    <input type="text" data-text="" placeholder="text" value="">
    <input type="text" data-value="" placeholder="value" value="" on-change="_add">
    <button class="record-action" on-click="_add" tabindex="-1">+</button>
  </div>
`,

  is: 'things-editor-options',

  properties: {
    options: {
      type: Array,
      notify: true,
      value: []
    }
  },

  attached() {
    if(!this.boundOnChange)
      this.boundOnChange = this._onChange.bind(this);

    this.addEventListener('change', this.boundOnChange);
  },

  detached() {
    this.removeEventListener('change', this.boundOnChange);
  },

  _onChange: function(e) {

    if(this._changingNow)
      return

    this._changingNow = true

    var input = e.target
    var value = input.value

    var div = input.parentElement

    if(div.hasAttribute('data-record')) {
      var dataList = div.querySelectorAll('[data-value]:not([hidden])')
      for(var i = 0;i < dataList.length;i++)
        if(dataList[i] !== input)
          dataList[i].value = value || ''
    }

    if(div.hasAttribute('data-record'))
      this._build(true)
    else if(div.hasAttribute('data-record-new') && input.hasAttribute('data-value'))
      this._add()

    e.stopPropagation()

    this._changingNow = false
  },

  _build: function(includeNewRecord) {
    if(includeNewRecord)
      var records = this.root.querySelectorAll('[data-record],[data-record-new]')
    else
      var records = this.root.querySelectorAll('[data-record]')

    var newoptions = []

    for(var i = 0;i < records.length;i++) {
      var record = records[i]

      var text = record.querySelector('[data-text]').value
      var inputs = record.querySelectorAll('[data-value]:not([style*="display: none"])')
      if(!inputs || inputs.length == 0)
        continue;

      var input = inputs[inputs.length - 1]
      var value = input.value

      if(text)
        newoptions.push({text: text, value: value || text})
    }

    this.set('options', newoptions)
  },

  _sort: function(e) {

    var sorter = function(a, b) {
        return b.text < a.text
      }

    var options = this._toArray(this.options).sort(sorter).reduce(function(sum, i) {
      sum[i.text] = i.value
      return sum
    }, {})

    this.set('options', options)
  },

  _add: function(e) {
    this._build(true)

    var inputs = this.root.querySelectorAll('[data-record-new] input:not([style*="display: none"])')

    for (var i = 0;i < inputs.length;i++) {
      let input = inputs[i]
      input.value = ''
    }

    inputs[0].focus()
  },

  _delete: function(e) {
    var record = e.target.parentElement
    record.querySelector('[data-text]').value = ''
    this._build()
  }
});
