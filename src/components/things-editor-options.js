import { PolymerElement, html } from '@polymer/polymer/polymer-element';

export default class ThingsEditorOptions extends PolymerElement {

  static get is() {
    return 'things-editor-options';
  }

  static get template() {
    return `
    <style>
    div {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-gap: 5px;
      grid-auto-rows: minmax(24px, auto);
    }

    input[data-text] {
      grid-column: span 5;
    }

    input[data-value] {
      grid-column: span 4;
    }

    button {
      grid-column: span 1;
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
    `;
  }

  static get properties() {
    return {
      options: {
        type: Array,
        notify: true,
        value: []
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.boundOnChange)
      this.boundOnChange = this._onChange.bind(this);

    this.addEventListener('change', this.boundOnChange);
  }

  disconnectedCallback() {
    super.connectedCallback();

    this.removeEventListener('change', this.boundOnChange);
  }

  _onChange(e) {

    if (this._changingNow)
      return

    this._changingNow = true

    var input = e.target
    var value = input.value

    var div = input.parentElement

    if (div.hasAttribute('data-record')) {
      var dataList = div.querySelectorAll('[data-value]:not([hidden])')
      for (var i = 0; i < dataList.length; i++)
        if (dataList[i] !== input)
          dataList[i].value = value || ''
    }

    if (div.hasAttribute('data-record'))
      this._build(true)
    else if (div.hasAttribute('data-record-new') && input.hasAttribute('data-value'))
      this._add()

    e.stopPropagation()

    this._changingNow = false
  }

  _build(includeNewRecord) {
    if (includeNewRecord)
      var records = this.root.querySelectorAll('[data-record],[data-record-new]')
    else
      var records = this.root.querySelectorAll('[data-record]')

    var newoptions = []

    for (var i = 0; i < records.length; i++) {
      var record = records[i]

      var text = record.querySelector('[data-text]').value
      var inputs = record.querySelectorAll('[data-value]:not([style*="display: none"])')
      if (!inputs || inputs.length == 0)
        continue;

      var input = inputs[inputs.length - 1]
      var value = input.value

      if (text)
        newoptions.push({ text: text, value: value || text })
    }

    this.set('options', newoptions)
  }

  _sort(e) {

    var sorter = function (a, b) {
      return b.text < a.text
    }

    var options = this._toArray(this.options).sort(sorter).reduce(function (sum, i) {
      sum[i.text] = i.value
      return sum
    }, {})

    this.set('options', options)
  }

  _add(e) {
    this._build(true)

    var inputs = this.root.querySelectorAll('[data-record-new] input:not([style*="display: none"])')

    for (var i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      input.value = ''
    }

    inputs[0].focus()
  }

  _delete(e) {
    var record = e.target.parentElement
    record.querySelector('[data-text]').value = ''
    this._build()
  }
}

customElements.define(ThingsEditorOptions.is, ThingsEditorOptions);
