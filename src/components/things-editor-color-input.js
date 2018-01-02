import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import tinycolor from 'tinycolor2';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
색상을 입력하는데 사용되는 입력 컴포넌트이다.
화면상에는 두개의 입력 필드가 보이며, 하나는 색상값을 키보드로 직접 입력하는 입력 픽드이며,
다른 하나는 마우스로 클릭하여 컬러 파레트를 팝업 시키는 입력 필드이다.
컬러 파레트를 팝업시키는 입력필드는 현재 입력된 색상으로 표시된다.

색상값을 직접 입력하는 필드에서는 'white', 'red', 'yellow' 등 색상의미 단어를 사용할 수도 있고,
#fff, #123456 와 같이 스타일에서 지정하는 방식의 3자리 및 6자리 숫자 표현도 가능하다.
컬러 파레트를 팝업시키는 입력 필드에서 색상을 지정하게되면, 모두 6자리 숫자 표현방식만을 사용한다.

의미 단어를 지원하는 색상은 다음과 같다.

aliceblue : #f0f8ff<br>
antiquewhite : #faebd7<br>
aqua : #00ffff<br>
aquamarine : #7fffd4<br>
azure : #f0ffff<br>
beige : #f5f5dc<br>
bisque : #ffe4c4<br>
black : #000000<br>
blanchedalmond : #ffebcd<br>
blue : #0000ff<br>
blueviolet : #8a2be2<br>
brown : #a52a2a<br>
burlywood : #deb887<br>
cadetblue : #5f9ea0<br>
chartreuse : #7fff00<br>
chocolate : #d2691e<br>
coral : #ff7f50<br>
cornflowerblue : #6495ed<br>
cornsilk : #fff8dc<br>
crimson : #dc143c<br>
cyan : #00ffff<br>
darkblue : #00008b<br>
darkcyan : #008b8b<br>
darkgoldenrod : #b8860b<br>
darkgray : #a9a9a9<br>
darkgreen : #006400<br>
darkkhaki : #bdb76b<br>
darkmagenta : #8b008b<br>
darkolivegreen : #556b2f<br>
darkorange : #ff8c00<br>
darkorchid : #9932cc<br>
darkred : #8b0000<br>
darksalmon : #e9967a<br>
darkseagreen : #8fbc8f<br>
darkslateblue : #483d8b<br>
darkslategray : #2f4f4f<br>
darkturquoise : #00ced1<br>
darkviolet : #9400d3<br>
deeppink : #ff1493<br>
deepskyblue : #00bfff<br>
dimgray : #696969<br>
dodgerblue : #1e90ff<br>
firebrick : #b22222<br>
floralwhite : #fffaf0<br>
forestgreen : #228b22<br>
fuchsia : #ff00ff<br>
gainsboro : #dcdcdc<br>
ghostwhite : #f8f8ff<br>
gold : #ffd700<br>
goldenrod : #daa520<br>
gray : #808080<br>
green : #008000<br>
greenyellow : #adff2f<br>
honeydew : #f0fff0<br>
hotpink : #ff69b4<br>
indianred  : #cd5c5c<br>
indigo : #4b0082<br>
ivory : #fffff0<br>
khaki : #f0e68c<br>
lavender : #e6e6fa<br>
lavenderblush : #fff0f5<br>
lawngreen : #7cfc00<br>
lemonchiffon : #fffacd<br>
lightblue : #add8e6<br>
lightcoral : #f08080<br>
lightcyan : #e0ffff<br>
lightgoldenrodyellow : #fafad2<br>
lightgrey : #d3d3d3<br>
lightgreen : #90ee90<br>
lightpink : #ffb6c1<br>
lightsalmon : #ffa07a<br>
lightseagreen : #20b2aa<br>
lightskyblue : #87cefa<br>
lightslategray : #778899<br>
lightsteelblue : #b0c4de<br>
lightyellow : #ffffe0<br>
lime : #00ff00<br>
limegreen : #32cd32<br>
linen : #faf0e6<br>
magenta : #ff00ff<br>
maroon : #800000<br>
mediumaquamarine : #66cdaa<br>
mediumblue : #0000cd<br>
mediumorchid : #ba55d3<br>
mediumpurple : #9370d8<br>
mediumseagreen : #3cb371<br>
mediumslateblue : #7b68ee<br>
mediumspringgreen : #00fa9a<br>
mediumturquoise : #48d1cc<br>
mediumvioletred : #c71585<br>
midnightblue : #191970<br>
mintcream : #f5fffa<br>
mistyrose : #ffe4e1<br>
moccasin : #ffe4b5<br>
navajowhite : #ffdead<br>
navy : #000080<br>
oldlace : #fdf5e6<br>
olive : #808000<br>
olivedrab : #6b8e23<br>
orange : #ffa500<br>
orangered : #ff4500<br>
orchid : #da70d6<br>
palegoldenrod : #eee8aa<br>
palegreen : #98fb98<br>
paleturquoise : #afeeee<br>
palevioletred : #d87093<br>
papayawhip : #ffefd5<br>
peachpuff : #ffdab9<br>
peru : #cd853f<br>
pink : #ffc0cb<br>
plum : #dda0dd<br>
powderblue : #b0e0e6<br>
purple : #800080<br>
red : #ff0000<br>
rosybrown : #bc8f8f<br>
royalblue : #4169e1<br>
saddlebrown : #8b4513<br>
salmon : #fa8072<br>
sandybrown : #f4a460<br>
seagreen : #2e8b57<br>
seashell : #fff5ee<br>
sienna : #a0522d<br>
silver : #c0c0c0<br>
skyblue : #87ceeb<br>
slateblue : #6a5acd<br>
slategray : #708090<br>
snow : #fffafa<br>
springgreen : #00ff7f<br>
steelblue : #4682b4<br>
tan : #d2b48c<br>
teal : #008080<br>
thistle : #d8bfd8<br>
tomato : #ff6347<br>
turquoise : #40e0d0<br>
violet : #ee82ee<br>
wheat : #f5deb3<br>
white : #ffffff<br>
whitesmoke : #f5f5f5<br>
yellow : #ffff00<br>
yellowgreen : #9acd32<br>

Example:

    <things-editor-color-input value="{{color}}">
    </things-editor-color-input>

@demo demo/index-editor-color.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        @apply(--things-editor-color-input)
      }

      input[type=text] {
        @apply(--things-editor-color-input-input-text);
        font-size: 13px;
      }

      input[type=alpha] {
        @apply(--things-editor-color-input-input-alpha)
      }

      input[type=color] {
        @apply(--things-editor-color-input-input-color)
      }

      #color {
        -webkit-appearance: none;
        position: relative;
        margin: 4px 0 0 -2px;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 10%;

        box-sizing: border-box;

        width: 20px;
        height: 23px;
      }
    </style>

    <input id="text" type="text" value="[[value]]" placeholder="[[placeholder]]">
    <input type="color" id="color">
`,

  is: 'things-editor-color-input',

  properties: {
    value: {
      type: String,
      notify: true,
      observer: '_onValueChanged'
    }
  },

  attached: function () {
    this.shadowRoot.addEventListener('change', e => {
      if(this.loop)
        return;

      this.loop = true;

      let inputType = e.target.getAttribute('type');
      let value = e.target.value;

      this.value = e.target.value;

      if(inputType == 'text')
        this.$.color.value = tinycolor(e.target.value).toHexString()

      this.loop = false;

      e.stopPropagation();

      this.fire('change');
    })
  },

  _onValueChanged: function (value) {
    if(this.$.color.value !== value)
      this.$.color.value = tinycolor(value).toHexString()
  }
});
