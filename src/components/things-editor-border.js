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

    <things-editor-border value={{border}}>
    </things-editor-border>

@demo demo/index-editor-border.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        display: block;
        @apply(--things-editor-border)
      }

      fieldset {
        padding: 0
      }

      label {
        @apply(--things-label);
      }

      .icon-only-label {
        @apply(--things-properties-icon-only-label);
        background: url(/assets/images/icon-properties-label.png) no-repeat;
      }

      things-editor-color {
        width: 95px;
      }

      things-editor-color::shadow input {
        width: 83% !important;
      }

      paper-dropdown-menu::shadow .underline .unfocused-line {
        background-color: #ccc
      }

      paper-dropdown-menu::shadow .underline .focused-line {
        background-color: var(--things-secondary-color)
      }

      paper-dropdown-menu::shadow input {
        margin-bottom: 0px
      }

      #border-set paper-button {
        margin: 0 0 3px 0;
        padding: 5px 2px;
        min-width: 35px;
      }

      .full-width things-editor-color::shadow #detail * {
        float: none !important
      }
    </style>

    <fieldset>
      <legend>border style</legend>
      <div id="border-set" class="border-style-btn">
        <paper-button data-value="out">
          <iron-icon icon="editor:border-outer"></iron-icon>
        </paper-button>
        <paper-button data-value="in">
          <iron-icon icon="editor:border-inner"></iron-icon>
        </paper-button>
        <paper-button data-value="all">
          <iron-icon icon="editor:border-all"></iron-icon>
        </paper-button>
        <paper-button data-value="left">
          <iron-icon icon="editor:border-left"></iron-icon>
        </paper-button>
        <paper-button data-value="center">
          <iron-icon icon="editor:border-vertical"></iron-icon>
        </paper-button>
        <paper-button data-value="right">
          <iron-icon icon="editor:border-right"></iron-icon>
        </paper-button>
        <paper-button data-value="top">
          <iron-icon icon="editor:border-top"></iron-icon>
        </paper-button>
        <paper-button data-value="middle">
          <iron-icon icon="editor:border-horizontal"></iron-icon>
        </paper-button>
        <paper-button data-value="bottom">
          <iron-icon icon="editor:border-bottom"></iron-icon>
        </paper-button>
        <paper-button data-value="clear">
          <iron-icon icon="editor:border-clear"></iron-icon>
        </paper-button>
      </div>


      <div class="full-width">
        <label class="icon-only-label linewidth">size</label>
        <things-editor-number-input id="border-width" number="{{borderWidth::change}}">
          <input>
        </things-editor-number-input>

        <label class="icon-only-label color">color</label>
        <things-editor-color id="border-color" value="{{borderColor}}">
        </things-editor-color>
      </div>

      <label>border type</label>
      <paper-dropdown-menu no-label-float="true" class="line-type solid">
        <!-- solid는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
        <paper-menu id="border-style" class="dropdown-content" selected="{{borderStyle}}" attr-for-selected="name">
          <paper-item class="solid" name="solid"></paper-item>
          <paper-item class="round-dot" name="round-dot"></paper-item>
          <paper-item class="square-dot" name="square-dot"></paper-item>
          <paper-item class="dash" name="dash"></paper-item>
          <paper-item class="dash-dot" name="dash-dot"></paper-item>
          <paper-item class="long-dash" name="long-dash"></paper-item>
          <paper-item class="long-dash-dot" name="long-dash-dot"></paper-item>
          <paper-item class="long-dash-dot-dot" name="long-dash-dot-dot"></paper-item>
        </paper-menu>
      </paper-dropdown-menu>

    </fieldset>
`,

  is: 'things-editor-border',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    borderWidth: {
      type: Number,
      value: 1,
      notify: true
    },
    borderColor: {
      type: String,
      value: 'black',
      notify: true
    },
    borderStyle: {
      type: String,
      value: 'solid',
      notify: true
    }
  },

  listeners: {
    change: '_onChange',
    'border-set.tap': '_onTapType',
    'border-style.iron-select': '_onChange'
  },

  _onTapType: function (e) {
    var target = e.target;

    while (!target.hasAttribute('data-value') && target !== this)
      target = target.parentElement;

    if (target === this)
      return;

    this.fire('border-type-click', {
      type: target.getAttribute('data-value'),
      borderWidth: this.borderWidth,
      borderStyle: this.borderStyle,
      borderColor: this.borderColor
    });

    e.stopPropagation();
  },

  _onChange: function (e) {
    var value = {};

    switch (e.srcElement.id) {
      case 'border-width':
        value.borderWidth = this.borderWidth;
        break;
      case 'border-style':
        value.borderStyle = this.borderStyle;
        break;
      case 'border-color':
        value.borderColor = this.borderColor;
        break;
      default:
        e.stopPropagation();
        return;
    }
    e.stopPropagation();
  }
});
