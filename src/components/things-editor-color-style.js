import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/iron-pages/iron-pages';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-radio-group/paper-radio-group';

import './things-i18n-msg';
import './things-editor-color';
import './things-editor-gradient';
import './things-editor-pattern';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

    <things-editor-color-style value="{{colorStyle}}">
    </things-editor-color-style>

@demo demo/index-editor-color-style.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      :host {
        display: block;
        @apply(--things-editor-color-style)
      }

      paper-radio-button {
        padding: 2px 1px 10px 7px !important;
      }

      .icon-only-label {
        @apply(--things-properties-icon-only-label);
        background: url(./assets/images/icon-properties-label.png) no-repeat;
        float: left;
        margin-top: 0;
      }

      .icon-only-label.color {
        background-position: 70% -498px;
      }
    </style>

    <paper-radio-group selected="{{fillType}}" on-change="onChangedFillType">
      <paper-radio-button name="no">
        <things-i18n-msg msgid="label.no-fill" auto="">no fill</things-i18n-msg>
      </paper-radio-button>
      <paper-radio-button name="solid">
        <things-i18n-msg msgid="label.solid" auto="">solid</things-i18n-msg>
      </paper-radio-button>
      <paper-radio-button name="gradient">
        <things-i18n-msg msgid="label.gradient" auto="">gradient</things-i18n-msg>
      </paper-radio-button>
      <paper-radio-button name="pattern">
        <things-i18n-msg msgid="label.pattern" auto="">pattern</things-i18n-msg>
      </paper-radio-button>
    </paper-radio-group>

    <iron-pages attr-for-selected="fill-type" selected="[[fillType]]">
      <div fill-type="no">
      </div>

      <div fill-type="solid">
        <label class="icon-only-label color"></label>
        <things-editor-color value="{{solid}}">
        </things-editor-color>

      </div>

      <div fill-type="gradient">
        <things-editor-gradient type="{{gradient.type}}" rotation="{{gradient.rotation}}" center="{{gradient.center}}" color-stops="{{gradient.colorStops}}" rotate-with-shapes="{{gradient.rotateWithShapes}}">
        </things-editor-gradient>
      </div>

      <div fill-type="pattern">
        <things-editor-pattern image="{{pattern.image}}" offset-x="{{pattern.offsetX}}" offset-y="{{pattern.offsetY}}" width="{{pattern.width}}" height="{{pattern.height}}" align="{{pattern.align}}" fit-pattern="{{pattern.fitPattern}}">
        </things-editor-pattern>
      </div>
    </iron-pages>
`,

  is: 'things-editor-color-style',

  properties: {
    value: {
      notify: true
    }
  },

  observers: [
    'onChandedGradient(gradient.*)',
    'onChangedPattern(pattern.*)',
    'onChangedSolid(solid)',
    'onChangedValue(value)'
  ],

  onChangedValue: function(value) {

    if(this.changedOnThis)
      return

    // var value = after.value

    /* 설정 값에 따라서, 멤버 속성을 설정한다. */
    if(!value) {
      this.fillType = 'no'

      this.solid = null
      this.gradient = null
      this.pattern = null
      return
    }

    switch(typeof(value)) {
    case 'string':
      this.fillType = 'solid'
      this.solid = value

      this.gradient = null
      this.pattern = null
      break
    case 'object':

      this.fillType = value.type

      if(value.type === 'gradient') {

        this.gradient = {
          type: value.gradientType || 'linear',
          colorStops: value.colorStops || [{
            position: 0,
            color: this.solid || '#000000'
          }, {
            position: 1,
            color: this.solid || '#FFFFFF'
          }],
          rotation: parseFloat(value.rotation) || 0,
          center: value.center,
          rotateWithShapes: true
        }

        this.pattern = null
        this.solid = null
      } else if(value.type === 'pattern') {

        this.pattern = {
          image: value.image,
          offsetX: parseInt(value.offsetX) || 0,
          offsetY: parseInt(value.offsetY) || 0,
          width: parseInt(value.width),
          height: parseInt(value.height),
          align: value.align,
          fitPattern: value.fitPattern
        }

        this.gradient = null
        this.solid = null
      }

      break
    default:
    }
  },

  onChangedSolid: function(value) {
    if(this.fillType !== 'solid')
      return

    this.changedOnThis = true

    this.value = value

    this.changedOnThis = false
  },

  onChangedFillType: function(e) {
    this.changedOnThis = true

    switch(e.target.name) {
      case 'gradient':
        if(!this.gradient) {
          this.gradient = {
            type: 'linear',
            colorStops: [{
              position: 0,
              color: this.solid || '#000000'
            }, {
              position: 1,
              color: this.solid || '#FFFFFF'
            }],
            rotation: 0,
            center: 'center',
            rotateWithShapes: true
          }
        }

        this.value = {
          type: 'gradient',
          gradientType: this.gradient.type || 'linear',
          colorStops: this.gradient.colorStops || [{
            position: 0,
            color: this.solid || '#000000'
          }, {
            position: 1,
            color: this.solid || '#FFFFFF'
          }],
          rotation: parseFloat(this.gradient.rotation) || 0,
          center: this.gradient.center,
          rotateWithShapes: this.gradient.rotateWithShapes
        }
        break

      case 'pattern':
        if(!this.pattern)
          this.pattern = {}

        this.value = {
          type: 'pattern',
          image: this.pattern.image,
          offsetX: parseInt(this.pattern.offsetX) || 0,
          offsetY: parseInt(this.pattern.offsetY) || 0,
          width: parseInt(this.pattern.width),
          height: parseInt(this.pattern.height),
          align: this.pattern.align,
          fitPattern: this.pattern.fitPattern
        }
        break

      case 'solid':
        if(!this.solid)
          this.solid = '#FFFFFF'
        this.value = this.solid
        break

      case 'no':
        this.value = ''
        break
    }

    this.changedOnThis = false
  },

  onChandedGradient: function(after) {
    /*
     * TODO Gradient의 rotation은 symmetry 기능 등으로 외부에서 변경될 수도 있다.
     * 이 점을 감안해서, 외부 변경에 대한 대응을 해야 한다.
     */

    if(this.fillType !== 'gradient')
      return

    this.changedOnThis = true

    var gradient = this.gradient

    if(!gradient)
      gradient = {}

    this.value = {
      type: 'gradient',
      gradientType: gradient.type || 'linear',
      colorStops: gradient.colorStops || [],
      rotation: parseFloat(gradient.rotation) || 0,
      center: gradient.center,
      rotateWithShapes: gradient.rotateWithShapes
    }

    this.changedOnThis = false
  },

  onChangedPattern: function(after) {

    if(this.fillType !== 'pattern')
      return

    this.changedOnThis = true

    var pattern = this.pattern

    if(!pattern)
      pattern = {}

    this.value = {
      type: 'pattern',
      image: pattern.image,
      offsetX: parseInt(pattern.offsetX) || 0,
      offsetY: parseInt(pattern.offsetY) || 0,
      width: parseInt(pattern.width),
      height: parseInt(pattern.height),
      align: pattern.align,
      fitPattern: pattern.fitPattern
    }

    this.changedOnThis = false

  }
});
