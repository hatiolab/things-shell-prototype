import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
// import '@polymer/paper-menu/paper-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/iron-icons/editor-icons';
// import '../../things-i18n-msg/things-i18n-msg';
import './things-editor-buttons-radio';
import './things-editor-color';
import './things-editor-number-input';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
테이블 셀의 좌,우,상,하 경계선의 스타일을 편집하는 컴포넌트이다.

Example:

    <things-editor-table value={{border}}>
    </things-editor-table>

@demo demo/index-editor-table.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      #pattern-set{
        padding:0 10px;
        overflow:hidden;
      }
    </style>

    <legend>
      <things-i18n-msg msgid="label.location-increase-pattern" auto="">Increase Pattern</things-i18n-msg>
    </legend>
    <label>
      <things-i18n-msg msgid="label.start-section" auto="">Start Section</things-i18n-msg>
    </label>
    <input type="number" data-start-section="" value="{{startSection::change}}">
    <label>
      <things-i18n-msg msgid="label.start-unit" auto="">Start Unit</things-i18n-msg>
    </label>
    <input type="number" data-start-unit="" value="{{startUnit::change}}">
    <label>
        <things-i18n-msg msgid="label.skip-numbering" auto="">Skip Numbering</things-i18n-msg>
      </label>
    <input type="checkbox" data-skip-numbering="" checked="{{skipNumbering::change}}">
    <div id="pattern-set" class="location-increase-pattern-btn">
      <paper-button data-value="cw">
        <iron-icon icon="editor:border-outer"></iron-icon>
      </paper-button>
      <paper-button data-value="ccw">
        <iron-icon icon="editor:border-inner"></iron-icon>
      </paper-button>
    </div>
`,

  is: 'things-editor-location-increase-pattern',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    startSection: {
      type: Number,
      value: 1
    },
    startUnit: {
      type: Number,
      value: 1
    },
    skipNumbering: {
      type: Boolean,
      value: true
    }
  },

  listeners: {
    'pattern-set.tap': '_onTapType'
  },

  _onTapType: function (e) {
    var target = e.target;

    while (!target.hasAttribute('data-value') && target !== this)
      target = target.parentElement;

    if (target === this)
      return;

    this.fire('rack-table-cell-increment-set', {
      increasingDirection: target.getAttribute('data-value'),
      startSection: this.startSection,
      startUnit: this.startUnit,
      skipNumbering: this.skipNumbering
    })

    e.stopPropagation();
  }
});
