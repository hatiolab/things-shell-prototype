import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import './things-editor-angle-input';
import './things-editor-color-stops';
Polymer({
  _template: `
    <style>
      :host {
        @apply(--things-editor-gradient)
      }

      :host, .grid-10 {
        display: grid;

        grid-template-columns: repeat(10, 1fr);
        grid-gap: 5px;
        grid-auto-rows: minmax(24px, auto);
      }

      .grid-10 {
        grid-column: span 10;
      }

      :host > * {
        line-height: 1.5;
      }

      :host > label {
        grid-column: span 2;
        text-align: right;
        text-transform: capitalize;
      }

      :host > .icon-only-label {
        grid-column: span 1;
      }

      :host > input, :host > iron-pages {
        grid-column: span 8;
      }

      :host > select {
        grid-column: span 4;
      }

      :host > things-editor-angle-input {
        grid-column: span 3;
      }

      things-editor-color-stops {
        grid-column: span 10;
      }

      .grid-10 > input[type=checkbox] {
        grid-column: 3 / 4;
      }

      .grid-10 > input[type=checkbox] ~ label {
        grid-column: span 7;
        text-align: left;
      }

      [gradient-direction] {
        overflow: hidden;
        max-width: 210px;
      }

      [gradient-direction] paper-item {
        background: url(./assets/images/icon-editor-gradient-direction.png) 50% 0 no-repeat;
        min-height: 32px;
        padding: 3px 5px;
        width: 30px;
        float: left;
      }

      [gradient-direction] [name=lefttop-to-rightbottom] {
        background-position: 50% 4px
      }

      [gradient-direction] [name=left-top] {
        background-position: 50% 4px
      }

      [gradient-direction] [name=top-to-bottom] {
        background-position: 50% -46px
      }

      [gradient-direction] [name=righttop-to-leftbottom] {
        background-position: 50% -96px
      }

      [gradient-direction] [name=right-top] {
        background-position: 50% -96px
      }

      [gradient-direction] [name=right-to-left] {
        background-position: 50% -146px
      }

      [gradient-direction] [name=rightbottom-to-lefttop] {
        background-position: 50% -196px
      }

      [gradient-direction] [name=right-bottom] {
        background-position: 50% -196px
      }

      [gradient-direction] [name=bottom-to-top] {
        background-position: 50% -246px
      }

      [gradient-direction] [name=leftbottom-to-righttop] {
        background-position: 50% -296px
      }

      [gradient-direction] [name=left-bottom] {
        background-position: 50% -296px
      }

      [gradient-direction] [name=left-to-right] {
        background-position: 50% -346px
      }

      [gradient-direction] [name=center-to-corner] {
        background-position: 50% -396px
      }

      [gradient-direction] [name=center] {
        background-position: 50% -396px
      }

      [gradient-direction] paper-item[focused] {
        background-color: rgba(255, 246, 143, .5);
      }

      [gradient-direction] paper-item:focus:before {
        display: none !important;
      }

      .icon-only-label {
        @apply(--things-properties-icon-only-label);
        top: 0 !important;
        width: 30px !important;
        background: url(./assets/images/icon-properties-label.png) no-repeat;
      }

      .icon-only-label.color {
        background-position: 70% -198px;
      }
    </style>

    <label>
      <things-i18n-msg msgid="label.type" auto="">type</things-i18n-msg>
    </label>
    <select value="{{type::change}}">
      <option>linear</option>
      <option>radial</option>
    </select>

    <label class="icon-only-label color"></label>
    <things-editor-angle-input radian="{{rotation}}">
      <input>
    </things-editor-angle-input>

    <label>
      <things-i18n-msg msgid="label.direction" auto="">direction</things-i18n-msg>
    </label>
    <iron-pages attr-for-selected="gradient-type" selected="[[type]]">
      <paper-dropdown-menu gradient-type="linear" no-label-float="true">
        <paper-listbox slot="dropdown-content" gradient-direction selected="{{direction}}" attr-for-selected="name">
          <paper-item name="lefttop-to-rightbottom"></paper-item>
          <paper-item name="top-to-bottom"></paper-item>
          <paper-item name="righttop-to-leftbottom"></paper-item>
          <paper-item name="right-to-left"></paper-item>
          <paper-item name="rightbottom-to-lefttop"></paper-item>
          <paper-item name="bottom-to-top"></paper-item>
          <paper-item name="leftbottom-to-righttop"></paper-item>
          <paper-item name="left-to-right"></paper-item>
          <paper-item name="center-to-corner"></paper-item>
        </paper-listbox>
      </paper-dropdown-menu>

      <paper-dropdown-menu gradient-type="radial" no-label-float="true">
        <paper-listbox slot="dropdown-content" gradient-direction selected="{{center}}" attr-for-selected="name">
          <paper-item name="center"></paper-item>
          <paper-item name="left-top"></paper-item>
          <paper-item name="right-top"></paper-item>
          <paper-item name="right-bottom"></paper-item>
          <paper-item name="left-bottom"></paper-item>
        </paper-listbox>
      </paper-dropdown-menu>
    </iron-pages>

    <div class="grid-10">
      <input type="checkbox" checked="{{rotateWithShapes::change}}" required>
      <label>
        <things-i18n-msg msgid="label.rotate-with-shapes" auto="">Rotate with shapes</things-i18n-msg>
      </label>
    </div>

    <things-editor-color-stops type="gradient" value="{{colorStops}}">
    </things-editor-color-stops>
  `,

  is: 'things-editor-gradient',

  properties: {
    type: {
      notify: true,
      value: 'linear'
    },
    rotation: {
      notify: true,
      type: Number,
      value: Math.PI / 4
    },
    center: {
      notify: true,
      value: 'center'
    },
    colorStops: {
      notify: true
    },
    rotateWithShapes: {
      type: Boolean,
      notify: true,
      value: false
    }
  },

  observers: [
    'onChangeDirection(direction)'
  ],

  onChangeDirection: function (after) {
    var rotation
    switch (after) {
      case "lefttop-to-rightbottom":
        rotation = 45
        break
      case "top-to-bottom":
        rotation = 90
        break
      case "righttop-to-leftbottom":
        rotation = 135
        break
      case "right-to-left":
        rotation = 180
        break
      case "rightbottom-to-lefttop":
        rotation = 215
        break
      case "bottom-to-top":
        rotation = 270
        break
      case "leftbottom-to-righttop":
        rotation = 315
        break
      case "left-to-right":
        rotation = 0
        break
      default:
        return
    }
    this.rotation = rotation / 360 * Math.PI * 2
  }
})
