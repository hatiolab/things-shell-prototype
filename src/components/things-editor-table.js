import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';

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
    return html`
    <style include="shared-styles">
      :host {
        display: block;
        @apply(--things-editor-table)
      }

      fieldset {
        @apply(--things-property-fieldset);
        padding: 10px 0 10px 0;
        margin: 0 0 10px 0;
      }

      fieldset legend {
        @apply(--things-property-fieldset-legend);
      }

      .icon-only-label {
        @apply(--things-properties-icon-only-label);
      }

      .property-grid {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
        grid-auto-rows: minmax(24px, auto);
        margin: 10px 0 0 0;
      }

      .property-grid > * {
        line-height: 1.5;
      }

      #border-set > iron-icon {
        grid-column: span 2;
        margin: 0 0 0 8px;
        width: 32px;
        height: 32px;
      }

      .property-grid > label {
        grid-column: span 3;
        text-align: right;
        text-transform: capitalize;
      }

      .property-grid > label.icon-only-label {
        grid-column: span 1;
      }

      .property-grid > things-editor-color, .property-grid > things-editor-number-input {
        grid-column: span 4;
        padding: 0;
        margin: 0;
      }

      .property-grid > paper-dropdown-menu {
        grid-column: span 7;
        padding: 0;
        margin: 0;
      }

      [table-event] {
        position: relative;
        background:url('/assets/images/icon-properties-table.png') no-repeat;
        grid-column: span 2;
        min-height:65px;
      }

      [table-event] span {
        position: absolute;
        bottom: 0;
        font-size: 0.9em;
        line-height: 1.2;
        text-transform: capitalize;
        text-align: center;
        vertical-align: bottom;
      }

      #merge-cells{background-position:50% 3px}
      #split-cells{background-position:50% -97px}
      #delete-row{background-position:50% -197px}
      #delete-column{background-position:50% -297px}
      #insert-above{background-position:50% -397px}
      #insert-below{background-position:50% -497px}
      #insert-left{background-position:50% -597px}
      #insert-right{background-position:50% -697px}
      #distribute-horizontal{background-position:50% -797px}
      #distribute-vertical{background-position:50% -897px}

    </style>

    <fieldset id='border-fieldset'>
      <legend>
        <things-i18n-msg msgid="label.border-style">border style</things-i18n-msg>
      </legend>

      <div id="border-set" class="property-grid border-style-btn" on-click="_onClickType">
        <iron-icon data-value="out" icon="editor:border-outer"></iron-icon>
        <iron-icon data-value="in" icon="editor:border-inner"></iron-icon>
        <iron-icon data-value="all" icon="editor:border-all"></iron-icon>
        <iron-icon data-value="left" icon="editor:border-left"></iron-icon>
        <iron-icon data-value="center" icon="editor:border-vertical"></iron-icon>
        <iron-icon data-value="right" icon="editor:border-right"></iron-icon>
        <iron-icon data-value="top" icon="editor:border-top"></iron-icon>
        <iron-icon data-value="middle" icon="editor:border-horizontal"></iron-icon>
        <iron-icon data-value="bottom" icon="editor:border-bottom"></iron-icon>
        <iron-icon data-value="clear" icon="editor:border-clear"></iron-icon>
      </div>

      <div class="property-grid">
        <label class="icon-only-label linewidth">
        </label>
        <things-editor-number-input id="border-width" number="{{borderWidth::change}}">
          <input>
        </things-editor-number-input>

        <label class="icon-only-label color">
        </label>
        <things-editor-color id="border-color" value="{{borderColor}}">
        </things-editor-color>

        <label>
          <things-i18n-msg msgid="label.border-type" >border type</things-i18n-msg>
        </label>
        <paper-dropdown-menu no-label-float="true" class="line-type solid">
        <!-- solid는 선택된 항목 보여주기위한 class로 하위 paper-item의 class와 동일하게 -->
          <paper-listbox id="border-style" slot="dropdown-content" selected="{{borderStyle}}" attr-for-selected="name">
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
      </div>

    </fieldset>

    <fieldset id="cell-fieldset" on-click="_onClickCell">
      <div class="property-grid">
        <div id="merge-cells" table-event><span>merge cells</span></div>
        <div id="split-cells" table-event><span>split cells</span></div>
        <div id="delete-row" table-event><span>delete row</span></div>
        <div id="delete-column" table-event><span>delete column</span></div>
        <div id="insert-above" table-event><span>insert above</span></div>
        <div id="insert-below" table-event><span>insert below</span></div>
        <div id="insert-left" table-event><span>insert left</span></div>
        <div id="insert-right" table-event><span>insert right</span></div>
        <div id="distribute-horizontal" table-event><span>distribute horizontal</span></div>
        <div id="distribute-vertical" table-event><span>distribute vertical</span></div>
      </div>
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
    if (target === this || target === null)
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
    if (target === this || target === null)
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
