import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import './things-editor-color';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
색상 배열을 편집하는 컴포넌트이다.

새로운 색상을 추가하고자 할 때는 `+` 버튼을 클릭한다.<br />
색상을 제거하고자 할 때는 `-` 버튼을 클릭한다.<br />

Example:

    <things-editor-multiple-color values="{{values}}">
    </things-editor-multiple-color>

@demo demo/index-editor-multiple-color.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        display: inline-block;
        @apply(--things-editor-multiple-color)
      }

      things-editor-color {
        width: 90px
      }

      things-editor-color::shadow input[type="text"] {
        width: 87%
      }

      things-editor-color::shadow a#color {
        float: right;
        margin: -31px 4px 0 0;
      }

      input[type="button"] {
        width: 22px;
        height: 25px;
        border: 1px solid rgba(0, 0, 0, .15);
        position: relative;
        top: -2px;
        padding-top: 0px;
        padding-bottom: 2px;
        background-color: #f1f2f4;
        color: #8f9192;
        font-size: 16px;
      }
    </style>

    <template is="dom-repeat" items="[[values]]">
      <div>

        <input type="button" value="+" on-click="_appendEditorColor" data-index="[[index]]">

        <things-editor-color value="{{item}}">
        </things-editor-color>

        <template is="dom-if" if="[[!_isOnly(item, index)]]">
          <input type="button" value="-" on-click="_removeEditorColor" data-index="[[index]]">
        </template>
      </div>
    </template>
`,

  is: 'things-editor-multiple-color',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    /**
     *
     */

    values: {
      type: Array,
      value: [],
      notify: true
    }
  },

  listeners: {
    // 'iron-resize': '_onIronResize',
    'change': '_onValueChanged'
  },

  observers: [

  ],

  _onValueChanged: function (e) {
    this.set('values', this.values.splice(0))
  },

  _appendEditorColor: function (e) {
    var values = this.values;
    values.splice(e.target.dataIndex + 1, 0, 'black')

    this.values = []
    this.async(function () {
      this.values = values
      this.fire('change', e)
    }, 1)
  },

  _removeEditorColor: function (e) {
    var values = []
    for (var i = 0; i < this.values.length; i++) {
      if (i === e.target.dataIndex)
        continue;
      else
        values.push(this.values[i])
    }

    this.values = []
    this.async(function () {
      this.values = values
      this.fire('change', e)
    }, 1)
  },

  _isOnly: function (item, index) {
    if (this.values.length === 1)
      return true

    return false
  }
});
