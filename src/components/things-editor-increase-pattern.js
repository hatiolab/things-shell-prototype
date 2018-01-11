import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-item/paper-item';
import '@polymer/iron-icons/editor-icons';

import './things-i18n-msg';
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
    <div id="pattern-set" class="location-increase-pattern-btn">
      <paper-button data-value="+u+s">
        <iron-icon icon="editor:border-outer"></iron-icon>
      </paper-button>
      <paper-button data-value="+u-s">
        <iron-icon icon="editor:border-inner"></iron-icon>
      </paper-button>
      <paper-button data-value="-u+s">
        <iron-icon icon="editor:border-all"></iron-icon>
      </paper-button>
      <paper-button data-value="-u-s">
        <iron-icon icon="editor:border-left"></iron-icon>
      </paper-button>
      <paper-button data-value="+s+u">
        <iron-icon icon="editor:border-vertical"></iron-icon>
      </paper-button>
      <paper-button data-value="+s-u">
        <iron-icon icon="editor:border-right"></iron-icon>
      </paper-button>
      <paper-button data-value="-s+u">
        <iron-icon icon="editor:border-top"></iron-icon>
      </paper-button>
      <paper-button data-value="-s-u">
        <iron-icon icon="editor:border-horizontal"></iron-icon>
      </paper-button>
    </div>
`,

  is: 'things-editor-increase-pattern',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    increasePattern: {
      type: String,
      value: '+u+s',
      notify: true
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

    this.set('increasePattern', target.getAttribute('data-value'))
    this.fire('change', target.getAttribute('data-value'))

    e.stopPropagation();
  }
});
