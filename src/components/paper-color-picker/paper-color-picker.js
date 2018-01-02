import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom';

import '@polymer/iron-flex-layout/iron-flex-layout';
import '@polymer/paper-slider/paper-slider';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-button/paper-button';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-input-container';
import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/neon-animation/animations/scale-up-animation';
import './paper-color-circle.js';

Polymer({
  _template: `
  <style>
    paper-color-circle {
      width:200px;
      height:200px;
    }
    #container {
      margin-top: 0px;
      padding: 0px;
      /*position:absolute;
      left:0px;
      top:0px;
      right:0px;
      bottom:0px;*/
    }
    #preview {
      padding: 0px;
      position: relative;
    }
    paper-slider {
      width:100%;
    }
    paper-input {
      width:100%;
      padding:0px 24px;
      box-sizing:border-box;
      margin:-10px 0px 0px 0px;
    }
    #huePicker {
      width:255px;
      margin:15px;
      height:15px;
      border-radius:2px;
    }
    .landscapeOnly, .portraitOnly {
      display:none;
    }
    #dialog {
      display: flex;
      align-items: stretch;
    }
    paper-input {
      margin-top:-1px;
      padding: 0px;
    }
    #detail {
      min-width: 240px;
      margin: 0px;
      padding: 0px;
    }
    paper-color-circle{
      display: block;
      margin: auto;
    }
    #preview {
      margin-top: 0px;
      background-image:
              linear-gradient(45deg, #eee 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #eee 75%),
              linear-gradient(45deg, #eee 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #eee 75%);
      background-size:24px 24px;
      background-position:0 0, 0px 0px, 12px 12px, 12px 12px;
    }
    :host([advanced]) {
    }
    .buttons{
      margin-top:20px;
      padding-left:0px;
      padding-right:0px;
    }
    #rgb{
      display:flex;
    }
    #rgb paper-input{
      flex: 1;
      margin: 0px 5px;
    }
    #rgb paper-input:first-child{
      margin-left: 0px;
    }
    #rgb paper-input:last-child{
      margin-right: 0px;
    }
    #color{
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 0;
    }
    @media only screen and (orientation : portrait){
      .portraitOnly {
        display:block;
      }
      #preview{
        min-height: 91px;
      }
      #dialog {
        width: 90%;
        max-width: 350px;
        flex-direction: column;
      }
      #detail{
        padding-top: 20px;
      }
      #details {
        padding: 0px 20px;
      }
    }
    @media only screen and (orientation : landscape){
      :host {
        width:480px;
      }
      #preview{
        width: 185px;
      }
      #detail {
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 20px;
      }
      #container {
        display:flex;
        flex-direction: row;
      }
      .landscapeOnly {
        display:block;
      }
    }
  </style>

  <paper-dialog id="dialog"
                entry-animation="scale-up-animation"
                exit-animation="fade-out-animation"
                with-backdrop
                class="color-picker-dialog">

    <div id="preview">
      <div id="color"></div>
    </div>
    <div id="detail">

      <paper-color-circle id="picker"  shape="{{shape}}" type="{{type}}" value="{{colorValue}}" color="{{immediateColor}}" hue="{{colorHue}}" lightness="{{colorLightness}}" on-lightness-changed="_setSliders" on-value-changed="_setSliders"></paper-color-circle>

      <div id="details">
        <template is="dom-if" if="{{_showValueSlider(shape, type)}}">
          <paper-input-container attr-for-value="immediate-value">
            <label slot="label">Value (Brightness)</label>
            <paper-slider id="valueSlider" class="paper-input-input" min="0" max="100" pin="true" value="100" immediate-value="{{sliderValue}}" slot="input"></paper-slider>
          </paper-input-container>
        </template>
        <template is="dom-if" if="{{_showLightnessSlider(shape, type)}}">
          <paper-input-container attr-for-value="immediate-value">
            <label slot="label">Lightness</label>
            <paper-slider id="lightnessSlider" class="paper-input-input" min="0" max="100" pin="true" value="50" immediate-value="{{sliderLightness}}" slot="input"></paper-slider>
          </paper-input-container>
        </template>
        <template is="dom-if" if="{{_showHuePicker(shape)}}">
          <paper-input-container attr-for-value="id">
            <label slot="label">Hue</label>
            <canvas id="huePicker" class="paper-input-input" on-tap="huePickerPickColor" on-track="huePickerPickColor" height="1" width="360" slot="input"></canvas>
          </paper-input-container>
          <!--<paper-slider id="hueSlider" min="0" max="100" value="50" immediate-value="{{sliderHue}}"></paper-slider>-->
        </template>

        <template is="dom-if" if="{{_and(allowAlpha,_initialAlphaValueHackApplied)}}">
          <paper-input-container attr-for-value="immediate-value" hidden$="{{!_or(alwaysShowAlpha, advanced)}}">
            <label slot="label">Alpha (transparency)</label>
            <paper-slider id="alphaPicker" class="paper-input-input" min="0" max="1" step="0.01" value="{{_initialAlphaValueHack}}" immediate-value="{{immediateColor.alpha}}" slot="input"></paper-slider>
          </paper-input-container>
        </template>

        <div hidden$="{{!advanced}}">
          <!--<div class="landscapeOnly">-->
          <div id="rgb">
            <paper-input id="redField" value="{{immediateColor.red}}" on-input="changeColorMixture" type="number" min="0" max="255" label="Red"></paper-input>
            <paper-input id="greenField" value="{{immediateColor.green}}" on-input="changeColorMixture" type="number" min="0" max="255" label="Green"></paper-input>
            <paper-input id="blueField" value="{{immediateColor.blue}}" on-input="changeColorMixture" type="number" min="0" max="255" label="Blue"></paper-input>
          </div>
          <!--</div>-->
        </div>
      </div>

      <div class="buttons">
        <paper-button dialog-dismiss>Cancel</paper-button>
        <paper-button on-tap="toggleAdvancedMode" hidden$="{{advanced}}">Advanced</paper-button>
        <paper-button dialog-confirm on-tap="setColor">OK</paper-button>
      </div>
    </div>

  </paper-dialog>
  `,
  is: 'paper-color-picker',
  properties: {
    /**
     * The selected color as an object: `{red, green, blue}`
     *
     * @attribute color
     * @type Object
     * @default new Object()
     */
    color: {
      type: Object,
      value: {
        red: undefined,
        green: undefined,
        blue: undefined,
        alpha: 1
      },
      notify: true
    },
    colorHue: {
      type: Number,
      value: 0
    },
    colorLightness: {
      type: Number,
      value: 0.5
    },
    colorValue: {
      type: Number,
      value: 1
    },
    disableUpdate: {
      type: Boolean,
      value: false
    },
    /**
     * Show alpha slider always instead of only in the advanced settings
     */
    alwaysShowAlpha: Boolean,
    /**
     * Whether to allow changing the transparency of the picked color
     */
    allowAlpha: Boolean,
    /**
     * The selected color as an object: `{red, green, blue}`
     * even before the user clicks ok
     *
     * @attribute immediateColor
     * @type Object
     * @default {red: 50, green: 50, blue: 50}
     */
    immediateColor: {
      type: Object,
      value: {
        red: 0,
        green: 150,
        blue: 136,
        alpha: 1
      },
      notify: true
    },
    /**
     * *square*, *circle* or *huebox*
     *
     * @attribute shape
     * @type string
     * @default 'circle'
     */
    shape: {
      type: String,
      value: 'circle',
      notify: true
    },
    sliderHue: {
      type: Number,
      value: 50
    },
    sliderLightness: {
      type: Number,
      value: 50,
      observer: 'sliderLightnessChanged'
    },
    sliderValue: {
      type: Number,
      value: 100,
      observer: 'sliderValueChanged'
    },
    /**
     * *hsv* or *hsl*
     *
     * @attribute type
     * @type string
     * @default 'hsv'
     */
    type: {
      type: String,
      value: 'hsv',
      notify: true
    },
    immediateColorAsString: {
      type: String,
      notify: true
    },
    colorAsString: {
      type: String,
      notify: true
    },
    advanced: {
      type: Boolean,
      reflectToAttribute: true,
      observer: '_recenterDialog'
    }
  },
  observers: [
    'immediateColorChanged(immediateColor.*)'
  ],
  ready: function(){
    if(!this.advanced){
      this.set('advanced', false);
    }
    if(!this.alwaysShowAlpha){
      this.set('alwaysShowAlpha', false);
    }
    this.async(function(){
      if(this._isColorDefined()){
        if(this.allowAlpha && typeof this.color.alpha !== 'undefined'){
          this._initialAlphaValueHack = this.color.alpha;
        }else{
          this._initialAlphaValueHack = 1;
        }
      }else if(this._isImmediateColorDefined()){
        if(this.allowAlpha && typeof this.immediateColor.alpha !== 'undefined'){
          this._initialAlphaValueHack = this.immediateColor.alpha;
        }else{
          this._initialAlphaValueHack = 1;
        }
      }else{
        this._initialAlphaValueHack = 1;
      }
      this._initialAlphaValueHackApplied = true;
    });
    window.addEventListener('resize', function(){
      this.$.dialog.resetFit();
    }.bind(this));
  },
  _and: function(a,b){
    return a && b;
  },
  _or: function(a,b){
    return a || b;
  },
  _isColorDefined: function(){
    return this.color.red >= 0 && this.color.green >= 0 && this.color.blue >= 0;
  },
  _isImmediateColorDefined: function(){
    return this.immediateColor.red >= 0 && this.immediateColor.green >= 0 && this.immediateColor.blue >= 0;
  },
  setColorWheel: function(){
    if (!this.disableUpdate){
      if(this._showValueSlider()){
        this.set('colorValue', this.sliderValue / 100);
      }
      if(this._showLightnessSlider())
        this.colorLightness = this.sliderLightness / 100;
      setTimeout(function(){
        this.disableUpdate = false;
      }.bind(this), 50);
    }
    this.disableUpdate = true;
  },
  sliderValueChanged: function(){
    this.setColorWheel();
  },
  sliderLightnessChanged: function(){
    this.setColorWheel();
  },
  _calculateLuminance: function(r, g, b){
    var a = [r,g,b].map(function(v) {
      v /= 255;
      return (v <= 0.03928) ?
      v / 12.92 :
              Math.pow( ((v+0.055)/1.055), 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  },
  immediateColorChanged: function(){
    if(typeof this.immediateColor.alpha == 'undefined'){
      this.immediateColor.alpha = 1;
    }
    var colorAsString = 'rgba(' + this.immediateColor['red'] + ',' + this.immediateColor['green'] + ',' + this.immediateColor['blue'] + ',' + this.immediateColor['alpha'] + ')'
    this.$.color.style.backgroundColor = colorAsString;
    this.immediateColorAsString = colorAsString;
  },
  drawHuePicker: function(){
    this._huePickerCtx = dom(this.root).querySelector('#huePicker').getContext('2d');
    var bitmap = this._huePickerCtx.getImageData(0, 0, 360, 30);
    for (var x = 0; x < 360; x++){
      var hue = x;
      var color = this.$.picker.hsv2rgb(hue, 1, 1);
      bitmap.data[4 * x + 0] = color[0];
      bitmap.data[4 * x + 1] = color[1];
      bitmap.data[4 * x + 2] = color[2];
      bitmap.data[4 * x + 3] = 255;
    }
    this._huePickerCtx.putImageData(bitmap, 0, 0);
  },
  huePickerPickColor: function(e){
    var rect = dom(this.root).querySelector('#huePicker').getBoundingClientRect();
    var percentage = (e.detail.x - rect.left) / rect.width;
    if(percentage > 0 && percentage < 1)
      this.colorHue = percentage;
  },
  changeColorMixture: function(){
    var red = this.$.redField.value;
    var green = this.$.greenField.value;
    var blue = this.$.blueField.value;
    var colors = {
      red: red,
      green: green,
      blue: blue
    };
    this.set('immediateColor', colors);
  },
  setColor: function(){
    this.set('color.red', this.immediateColor.red);
    this.set('color.green', this.immediateColor.green);
    this.set('color.blue', this.immediateColor.blue);
    this.set('color.alpha', this.immediateColor.alpha);
    this.set('colorAsString', this.immediateColorAsString);
  },
  open: function(){
    if (this.color && this.color['green'])
      this.immediateColor = this.color;
    this.immediateColorChanged();
    this.$.dialog.open();
    if (this._showHuePicker())
      this.drawHuePicker();
  },
  _computeColouredaaborder: function(){
    return {
      red: 50,
      green: 50,
      blue: 50
    };
  },
  _showValueSlider: function(){
    return this.type == 'hsv' && this.shape !== 'huebox';
  },
  _showLightnessSlider: function(){
    return this.type == 'hsl' && this.shape !== 'huebox';
  },
  _showHuePicker: function(){
    return this.shape == 'huebox';
  },
  toggleAdvancedMode: function(){
    this.advanced = !this.advanced;
  },
  _recenterDialog: function(){
    if(this.$.dialog.opened)
      this.$.dialog.center();
  },
  _setSliders: function(){
    this.async(function(){
      var valueSlider = dom(this.root).querySelector('#valueSlider');
      if(valueSlider){
        valueSlider.set('value', this.colorValue*100);
      }
      var lightnessSlider = dom(this.root).querySelector('#lightnessSlider');
      if(lightnessSlider){
        lightnessSlider.set('value', this.colorLightness*100);
      }
    });
  }
});
