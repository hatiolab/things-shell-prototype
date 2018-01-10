import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
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

class ThingsEditorTable extends mixinBehaviors([IronResizableBehavior], PolymerElement) {

  static get is() { return 'things-editor-table'; }

  static get template() {
    return `
    <style>
      :host {
        display: block;
        @apply(--things-editor-table)
      }
      fieldset{
        padding:0
      }
      label{
        @apply(--things-label);
      }
      .icon-only-label{
        @apply(--things-properties-icon-only-label);
      }
      things-editor-color{
        width:95px;
      }
      things-editor-color::shadow input{
        width:83% !important;
      }
      paper-dropdown-menu::shadow .underline .unfocused-line{background-color:#ccc}
      paper-dropdown-menu::shadow .underline .focused-line{background-color:var(--secondary-color)}
      paper-dropdown-menu::shadow input{margin-bottom:0px}
      #border-set paper-button{
        margin:0 0 3px 0;
        padding:5px 2px;
        min-width:35px;
      }
      .full-width things-editor-color::shadow #detail *{float:none !important}
      #cell-fieldset{ on-click="_onClickCell"
        padding:0 10px !important;
      }
      #cell-fieldset  on-click="_onClickCell"paper-button{
        display:inline-block;
        width:55px;
        margin:0 10px 10px 0;
      }
    </style>

    <fieldset id='border-fieldset'>
      <legend>
        <things-i18n-msg msgid="label.border-style">border style</things-i18n-msg>
      </legend>
      <div id="border-set" class="border-style-btn" on-click="_onClickType">
        <paper-button data-value="out"><iron-icon icon="editor:border-outer"></iron-icon></paper-button>
        <paper-button data-value="in"><iron-icon icon="editor:border-inner"></iron-icon></paper-button>
        <paper-button data-value="all"><iron-icon icon="editor:border-all"></iron-icon></paper-button>
        <paper-button data-value="left"><iron-icon icon="editor:border-left"></iron-icon></paper-button>
        <paper-button data-value="center"><iron-icon icon="editor:border-vertical"></iron-icon></paper-button>
        <paper-button data-value="right"><iron-icon icon="editor:border-right"></iron-icon></paper-button>
        <paper-button data-value="top"><iron-icon icon="editor:border-top"></iron-icon></paper-button>
        <paper-button data-value="middle"><iron-icon icon="editor:border-horizontal"></iron-icon></paper-button>
        <paper-button data-value="bottom"><iron-icon icon="editor:border-bottom"></iron-icon></paper-button>
        <paper-button data-value="clear"><iron-icon icon="editor:border-clear"></iron-icon></paper-button>
      </div>

      <div class="full-width">
        <label class="icon-only-label linewidth">
          <things-i18n-msg msgid="label.size">size</things-i18n-msg>
        </label>
        <things-editor-number-input id="border-width" number="{{borderWidth::change}}">
          <input>
        </things-editor-number-input>

        <label class="icon-only-label color">
          <things-i18n-msg msgid="label.color" >color</things-i18n-msg>
        </label>
        <things-editor-color id="border-color" value="{{borderColor}}">
        </things-editor-color>
      </div>

      <label>
        <things-i18n-msg msgid="label.border-type" >border type</things-i18n-msg>
      </label>
      <paper-dropdown-menu no-label-float="true" class="line-type solid">
      <!-- solid는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
        <paper-listbox id="border-style" class="dropdown-content" selected="{{borderStyle}}" attr-for-selected="name">
          <paper-item class="solid" name="solid"></paper-item>
          <paper-item class="round-dot" name="round-dot"></paper-item>
          <paper-item class="square-dot" name="square-dot"></paper-item>
          <paper-item class="dash" name="dash"></paper-item>
          <paper-item class="dash-dot" name="dash-dot"></paper-item>
          <paper-item class="long-dash" name="long-dash"></paper-item>
          <paper-item class="long-dash-dot" name="long-dash-dot"></paper-item>
          <paper-item class="long-dash-dot-dot" name="long-dash-dot-dot"></paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

    </fieldset>

    <fieldset id="cell-fieldset" on-click="_onClickCell">
      <paper-button id="merge-cells" table-event>merge cells</paper-button>
      <paper-button id="split-cells" table-event>split cells</paper-button>
      <paper-button id="delete-row" table-event>delete row</paper-button>
      <paper-button id="delete-column" table-event>delete column</paper-button>
      <paper-button id="insert-above" table-event>insert above</paper-button>
      <paper-button id="insert-below" table-event>insert below</paper-button>
      <paper-button id="insert-left" table-event>insert left</paper-button>
      <paper-button id="insert-right" table-event>insert right</paper-button>
      <paper-button id="distribute-horizontal" table-event>distribute horizontal</paper-button>
      <paper-button id="distribute-vertical" table-event>distribute vertical</paper-button>
    </fieldset>
  `;
  }

  static get properties() {
    return {
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
    }
  }

  constructor() {
    super();
    this.boundBorderChange = this._onBorderChange.bind(this);
    this.boundTapType = this._onClickType.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.$['border-fieldset'].addEventListener('change', this.boundTapType);
    this.$['border-style'].addEventListener('iron-select', this.boundBorderChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.$['border-fieldset'].removeEventListener('change', this.boundTapType);
    this.$['border-style'].removeEventListener('iron-select', this.boundBorderChange);
  }

  _onClickCell(e) {
    // TODO 여기서 cell 핸들링 관련된 이벤트를 fire 한다.
    // 각 버튼의 fire할 이벤트의 이름을 'table-' + id 로 한다.
    var target = e.target;
    while (target && !target.hasAttribute('table-event') && target !== this)
      target = target.parentElement;
    if(target === this || target === null)
      return;
    this.dispatchEvent(new CustomEvent('table-' + target.id, {
      bubbles: true,
      composed: true
    }));
    e.stopPropagation();
  }

  _onClickType(e) {
    var target = e.target;
    while (target && !target.hasAttribute('data-value') && target !== this)
      target = target.parentElement;
    if(target === this || target === null)
      return;
    this.dispatchEvent(new CustomEvent('table-cell-border-set', {
      bubbles: true,
      composed: true,
      detail: {
        type: target.getAttribute('data-value'),
        borderWidth: this.borderWidth,
        borderStyle: this.borderStyle,
        borderColor: this.borderColor
      }
    }));

    e.stopPropagation();
  }

  _onBorderChange(e) {
    e.stopPropagation();
  }
}

customElements.define(ThingsEditorTable.is, ThingsEditorTable);
