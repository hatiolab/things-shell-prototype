import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group';

import './things-i18n-msg';
import './things-editor-code';
import './things-editor-value-map';
import './things-editor-value-range';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <things-editor-value mapping="{{mapping}}">
  </things-editor-value>

@demo demo/index-editor-value-x.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      :host {
        @apply(--things-properties-variable-panel);
        padding: 4px;

        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 4px;
        grid-auto-rows: minmax(24px, auto);
      }

      :host > * {
        line-height: 1.5;
      }

      :host > label {
        grid-column: span 3;
        text-align: right;
        text-transform: capitalize;
      }

      :host > input, :host > select, :host > paper-radio-group {
        grid-column: span 7;
      }

      :host > iron-pages {
        grid-column: span 10;
      }

      paper-radio-button {
        padding: 2px 1px 2px 4px !important;
      }

      things-editor-code {
        height: 300px;
        overflow: auto;
      }
    </style>

    <label>
      <things-i18n-msg msgid="label.accessor" auto="">accessor</things-i18n-msg>
    </label>
    <input id="accessor" type="text" data-mapping-accessor="" value="{{mapping.accessor::change}}">

    <label>
      <things-i18n-msg msgid="label.target" auto="">target</things-i18n-msg>
    </label>

    <input id="target-input" type="text" list="target-list" value="{{mapping.target::change}}">
    <datalist id="target-list">
      <option value="(self)"></option>
      <option value="(key)"></option>
    </datalist>

    <label>
      <things-i18n-msg msgid="label.property" auto="">property</things-i18n-msg>
    </label>
    <select value="{{mapping.property::change}}">
      <template is="dom-repeat" items="[[props]]">
        <option value="[[item.name]]">[[item.label]]</option>
      </template>
    </select>

    <label>
      <things-i18n-msg msgid="label.rule-type" auto="">rule type</things-i18n-msg>
    </label>
    <paper-radio-group selected="{{mapping.rule}}">
      <paper-radio-button name="value">
        <things-i18n-msg msgid="label.value" auto="">value</things-i18n-msg>
      </paper-radio-button>
      <paper-radio-button name="map">
        <things-i18n-msg msgid="label.map" auto="">map</things-i18n-msg>
      </paper-radio-button>
      <paper-radio-button name="range">
        <things-i18n-msg msgid="label.range" auto="">range</things-i18n-msg>
      </paper-radio-button>
      <paper-radio-button name="eval">
        <things-i18n-msg msgid="label.eval" auto="">eval</things-i18n-msg>
      </paper-radio-button>
    </paper-radio-group>

    <iron-pages attr-for-selected="data-rule-type" selected="[[mapping.rule]]" class="content">
      <things-editor-value-map data-rule-type="map" map="{{rule.map}}" value-type="[[valueType]]">
      </things-editor-value-map>

      <things-editor-value-range data-rule-type="range" range="{{rule.range}}" value-type="[[valueType]]">
      </things-editor-value-range>

      <div data-rule-type="eval">
        <things-editor-code id="eval-editor" value="{{rule.eval}}">
        </things-editor-code>
      </div>
    </iron-pages>
`,

  is: 'things-editor-value',

  properties: {
    mapping: {
      type: Object,
      notify: true
    }
  },

  observers: [
    'onChangedMapping(mapping.*)',
    'onChangedRule(rule.*)',
    '_valueType(mapping.property)'
  ],

  /* TODO Nature의 property의 속성에 따른 valueType으로 변경할 것. */
  _valueType: function (property) {
    switch (property) {
      case 'hidden':
      case 'started':
        this.valueType = 'boolean'
        break
      case 'rotation':
      case 'value':
        this.valueType = 'number'
        break
      case 'fillStyle':
      case 'strokeStyle':
      case 'fontColor':
        this.valueType = 'color'
        break
      case 'data':
      case 'location':
      case 'dimension':
        this.valueType = 'object'
        break;
      case 'text':
      case 'ref':
      default:
        this.valueType = 'string'
        break
    }
  },

  onChangedMapping: function (change) {

    this._not_changed_actually = (change.path === 'mapping')

    /* 사용자가 선택한 컴포넌트가 바뀐 경우도 호출되므로, 이 경우는 제외한다. */
    if (this._not_changed_actually) {
      var rule = {}

      if (this.mapping) {
        switch (this.mapping.rule) {
          case 'map':
            rule.map = this.mapping.param || {}
            break
          case 'range':
            rule.range = this.mapping.param || []
            break
          case 'eval':
            rule.eval = this.mapping.param || ''
            break
        }
      }

      this.set('rule', rule)

      this.$$('[data-mapping-accessor]').select()

      return
    }

    var param

    if (change.path == 'mapping.rule') {
      switch (this.mapping.rule) {
        case 'map':
          param = this.rule.map
          break
        case 'range':
          param = this.rule.range
          break
        case 'eval':
          param = this.rule.eval || ''

          // rule.eval에 값이 없을 때, ace-editor 내용이 초기화되지 않는 문제때문에 처리함.
          if (!param)
            this.$['eval-editor'].editor.setValue('')
          break
        default:
      }

      this.set('mapping.param', param)
    } else if (change.path == 'mapping.target') {
      let target = this.mapping.target
      if (target.length > 0 && !/^[.#(\[]/.test(target)) {
        this.mapping.target = '#' + target
        this.$['target-input'].value = this.mapping.target
      }
    } else if (change.path == 'mapping.accessor') {
      let accessor = this.mapping.accessor
      if (accessor) {
        this.mapping.accessor = accessor.trim()
        this.$['accessor'].value = this.mapping.accessor
      }
    }

    this.fire('value-change', this.mapping)
  },

  onChangedRule: function (change) {

    if (!this.mapping)
      return

    var param

    switch (this.mapping.rule) {
      case 'map':
        param = this.rule.map
        break
      case 'range':
        param = this.rule.range
        break
      case 'eval':
        param = this.rule.eval || ''
        break
      default:
    }

    this.set('mapping.param', param)
  }
});
