import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
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
        display: block;
        @apply(--things-editor-gradient)
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

      label {
        @apply(--things-label);
      }

      select {
        @apply(--things-select);
        background: url(./assets/images/bg-input-select.png) 100% 50% no-repeat #fff;
      }

      .full-width > * {
        float: left;
      }

      .full-width > label {
        width: initial;
        top: 2px;
        margin-right: 4px;
      }

      .full-width > select {
        width: 40%;
        min-width: 40%;
        margin-right: 2px;
      }

      .full-width > input {
        @apply(--things-input);
        width: 28%;
      }

      .full-width > things-editor-angle-input {
        width: 32%;
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

      iron-pages {
        display: inline-block;
        margin: 0 20px;
        /* width: 65%; */
        width: 100%;
      }

      things-editor-color-stops {
        margin: 0 10px;
      }

      .merge-column {
        margin: 0 0 7px 10px;
      }
    </style>

    <div class="full-width">
      <label>type</label>
      <select value="{{type::change}}">
        <option>linear</option>
        <option>radial</option>
      </select>
      <label class="icon-only-label color"></label>
      <things-editor-angle-input radian="{{rotation}}">
        <input>
      </things-editor-angle-input>
    </div>

    <!--label>direction</label-->

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

    <things-editor-color-stops type="gradient" value="{{colorStops}}">
    </things-editor-color-stops>

    <div class="merge-column">
      <input type="checkbox" checked="{{rotateWithShapes::change}}" required=""> Rotate with shapes
    </div>
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
