import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import './things-editor-color';
import './things-editor-number-input';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
범위내에서 여러 컬러셋(포지션과 색깔) 배열을 편집하는 컴포넌트이다.

미리보기 Bar에서는 gradient나, solid 형태의 컬러셋을 보여준다.

새로운 컬러셋을 추가고자 할 때는 미리보기 Bar를 더블클릭한다.
컬러셋을 제거하고자 할 때는 컬러셋 마커를 아래방향으로 드래깅한다.
컬러셋의 위치를 옮기고자 할 때는, 컬러셋 마커를 좌우로 드래깅하여 이동시키거나,
옮기고자하는 컬러셋 마커를 마우스로 선택하고, 포지션 입력 에디터에서 직접 수정한다.
컬러셋의 색상을 바꾸고자 할 때는, 컬러셋 마커를 더블클릭하여 컬러파레트를 팝업시켜서 색상을 선택하거나, 색상 입력 에디터에서 직접 색상을 수정할 수 있다.

Example:

    <things-editor-color-stops type="gradient"
                               value="{{gradient.colorStops}}">
    </things-editor-color-stops>

@demo demo/index-editor-color-stops.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      :host {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 0;
        grid-auto-rows: minmax(0, auto);

        @apply(--things-editor-color-stops)
      }

      #color-stops {
        grid-column: 1 / 11;
        grid-row: 1;

        clear: both;
        margin-bottom: -3px;
        @apply(--things-editor-colorbar-container)
      }

      #colorbar {
        width: 95%;
        height: 12px;
        margin: auto;
        margin-bottom: 25px;
        @apply(--things-editor-colorbar)
      }

      #markers {
        position: relative;
        top: 30px;
        @apply(--things-editor-colorbar-markers)
      }

      #markers div {
        width: 10px;
        height: 10px;
        margin-top: -15px;
        position: absolute;
        border: 2px solid #fff;
        cursor: pointer;
        -webkit-box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
        box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.2);
        @apply(--things-editor-colorbar-marker)
      }

      #markers div::before {
        border-bottom: 6px solid #fff;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
        content: "";
        width: 0;
        height: 0;
        left: -2px;
        position: absolute;
        top: -8px;
      }

      #markers div[focused] {
        border-color: var(--things-editor-colorbar-marker-focused-color, #585858);
      }

      #markers div[focused]:before {
        border-bottom: 7px solid var(--things-editor-colorbar-marker-focused-color, #585858);
      }

      .icon-only-label {
        @apply(--things-properties-icon-only-label);
        background: url(./assets/images/icon-properties-label.png) no-repeat;
      }

      .icon-only-label.color {
        grid-column: 1 / 2;
        grid-row: 2;

        background-position: 70% -498px;
        float: left;
        margin-top: 0;
      }

      .icon-only-label.position {
        grid-column: 7 / 8;
        grid-row: 2;

        background-position: 70% -797px;
        float: left;
        margin-top: 0;
      }

      things-editor-color {
        grid-column: 2 / 7;
        grid-row: 2;
      }

      things-editor-number-input {
        grid-column: 8 / 11;
        grid-row: 2;
      }

    </style>

    <div id="color-stops">
      <div id="colorbar" on-dblclick="_onDblClickColorbar">
        <div id="markers" on-down="_onDownMarkers" on-dblclick="_onDblClickMarkers" on-track="_onTrackMarkers" on-mouseup="_onMouseUpMarkers">
          <template id="markers-template" is="dom-repeat" items="[[_refinedValue(value)]]">
            <div style\$="background-color:[[item.color]];margin-left:[[_calculatePosition(item.position, min, max)]]px;" marker-index\$="[[index]]" draggable="false">
            </div>
          </template>
        </div>
      </div>
    </div>

    <label class="icon-only-label color"></label>
    <things-editor-color id="color-editor" value="{{focused.color}}" on-change="_onChangeSubComponent">
    </things-editor-color>

    <label class="icon-only-label position"></label>
    <things-editor-number-input  id="color-position" number="{{focused.position::change}}" on-change="_onChangeSubComponent">
      <input>
    </things-editor-number-input>
  `,

  is: 'things-editor-color-stops',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    /**
     * `type`은 color-stop bar의 표시 방법을 의미한다.
     * - 'solid' : 컬러스톱위치에서 다음 컬러스톱까지 solid color로 채운다.
     * - 'gradient' : 컬러스톱위치에서 다음 컬러스톱까지 gradient color로 채운다.
     */
    type: {
      type: String,
      value: "solid"
    },
    /**
     * `min`은 color-stop bar의 위치값 범위의 최소값을 의미한다.
     */
    min: {
      type: Number,
      value: 0
    },
    /**
     * `max`은 color-stop bar의 위치값 범위의 최대값을 의미한다.
     */
    max: {
      type: Number,
      value: 1
    },

    /**
     * `value`은 color-stops에 의해 만들어진 color-stop 배열을 유지한다.
     */
    value: {
      type: Array,
      notify: true
    },

    _markersMoved: {
      type: Boolean,
      value: false
    }
  },

  listeners: {
    'iron-resize': '_onIronResize'
  },

  observers: [
    '_onFocusedChanged(focused.*)',
    '_onChangeValue(value.*)',
    '_onChangeProps(min, max, type)'
  ],

  _refinedValue: function (value) {
    return value instanceof Array ? value : []
  },

  _setFocused: function (index) {
    if (this.focused && this.focused.index === index)
      return

    /* 마커 템플릿을 다시 만든다. */
    this.$['markers-template'].render();

    var marker = this.shadowRoot.querySelector(`#markers div[marker-index='${index}']`)
    var olds = this.root.querySelectorAll('#markers div[focused]')
    olds.length > 0 && olds.forEach(old => old.removeAttribute('focused'))
    marker && marker.setAttribute('focused', true)
    if (!marker) {
      this.focused = null
      return
    }
    var colorStop = this.value[index]
    var position = colorStop.position
    if (position < this.min)
      position = this.min
    if (position > this.max)
      position = this.max
    this.focused = {
      index: index,
      color: colorStop.color,
      position: position
    }
  },

  _onFocusedChanged: function (change) {

    if (change.path === 'focused') {
      if (!change.value)
        this._setFocused(-1) // clear focused marker

      return
    }
    var property = change.path.substr(8) // 8 : 'focused.'.length

    this.changedOnThis = true

    var focused = this.focused

    this.value = this.value.map(function (colorStop, index) {

      if (index != focused.index)
        return colorStop

      return {
        color: focused.color,
        position: focused.position
      }
    }).sort(function (a, b) {
      return b.position < a.position
    })

    if (property == 'position') {
      var colorStop = this.value[focused.index]

      if (focused.position != colorStop.position || focused.color != colorStop.color) {
        var index = -1
        for (var i = 0; i < this.value.length; i++) {
          colorStop = this.value[i]
          if (focused.position == colorStop.position && focused.color == colorStop.color) {
            index = i
            break
          }
        }

        this._setFocused(index)
      }
    }

    this.changedOnThis = false
  },

  _renderColorBar: function (min, max, type) {

    var value = this._refinedValue(this.value)
    var gradient = ''

    if (value instanceof Array && value.length > 0) {
      if (this.type == 'gradient') {
        var stopsStrings = (value || []).map(function (stop) {
          var position = (stop.position - min) / (max - min)
          return html`${stop.color} ${position * 100}%`
        })
      } else {
        var stops = value || []
        var last = null
        var last_position = 0
        var stopsStrings = stops.map(function (stop) {
          var stop_position = (stop.position - min) / (max - min)
          if (last) {
            last_position = (last.position - min) / (max - min)
            var step = `${stop.color} ${last_position * 100}%, ${stop.color} ${stop_position * 100}%`
          } else {
            var step = `${stop.color} ${stop_position * 100}%`
          }
          last = stop
          return step
        })
        if (last) {
          last_position = (last.position - min) / (max - min)
          stopsStrings.push(`${last.color} ${last_position * 100}%, white ${last_position * 100}%, white 100%`)
        }
      }

      gradient = stopsStrings.join(',')
    } else {
      gradient = 'black 0%, black 100%'
    }

    this.$.colorbar.style.background = `linear-gradient(to right, ${gradient})`
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  },

  _onChangeSubComponent: function (e) {
    e.stopPropagation()
    this.fire('change')
  },

  _onChangeProps: function (min, max, type) {
    this._renderColorBar(min, max, type)
  },

  _onChangeValue: function (change) {

    if (!this.changedOnThis)
      this.focused = null

    this._renderColorBar(this.min, this.max, this.type)
  },

  _onDblClickColorbar: function (e) {
    /* 마커를 클릭한 경우를 걸러낸다. */
    if (e.target !== this.$.colorbar)
      return

    var width = this.$.colorbar.offsetWidth
    var position = this.min + (this.max - this.min) * (e.offsetX / width)
    var colorStops = this.value ? this.value.slice() : []


    for (var i = 0; i < colorStops.length; i++) {
      if (colorStops[i].position > position)
        break
    }

    colorStops.splice(i, 0, {
      position: position,
      color: '#FFFFFF'
    })

    this.value = colorStops

    this.focused = null
    this._setFocused(i)

    this.fire('change')
  },

  _onDownMarkers: function (e) {
    var marker = e.target
    var index = marker.getAttribute('marker-index')

    this._setFocused(index)

    this.dragstart = {
      position: this.focused.position,
      x: e.detail.x
    }
  },

  _onDblClickMarkers: function (e) {
    this.$["color-editor"].showPicker()
  },

  _onTrackMarkers: function (e) {
    this._markersMoved = true;

    switch (e.detail.state) {
      case 'track':
        var width = this.$.colorbar.offsetWidth

        var position = this.dragstart.position
          + ((e.detail.x - this.dragstart.x) / width * (this.max - this.min))

        if (position > this.max)
          position = this.max
        else if (position < this.min)
          position = this.min

        this.set('focused.position', position)
        break;

      case 'end':
        /* 40 픽셀 이상 아래로 잡아당기면 삭제됨. */
        if (e.detail.dy > 40) {
          this.value.splice(this.focused.index, 1)
          this.value = this.value.slice()

          this.fire("change")
        }
        break;

      case 'start':
        break;
    }
  },

  _onMouseUpMarkers: function (e) {
    if (this._markersMoved)
      this.fire('change')

    this._markersMoved = false;
  },

  _calculatePosition: function (position, min, max) {
    /* TODO 7 ==> 마커 폭의 절반으로 계산해야함. */
    var calculated = position

    if (calculated > this.max)
      calculated = this.max
    else if (calculated < this.min)
      calculated = this.min

    var width = this.$.colorbar.offsetWidth || this._colorbar_size || 0

    return (calculated - this.min) / (this.max - this.min) * width - 7
  },

  _onIronResize: function (e) {
    /* [더 좋은 방법으로 개선해주세요.]
     * 이 컴포넌트가 보이지 않는 상태에서 marker의 위치를 잡지 못하는 문제를 해결하기 위한 고육책
     * 그 원인은 컴포넌트가 보이지 않는 상태에서는 this.$.colorbar.offsetWidth 값이 0이기 떄문이다.
     */
    var width = this.$.colorbar.offsetWidth

    if (width > 0) {
      var template = this.$['markers-template']
      template.items = []
      template.render()
      template.items = this._refinedValue(this.value)

      /* hide => show 시에 resize 이벤트를 발생시키지 못한다.
        그래서, 사이즈가 0 이상일 때(즉 show상태일 때) 값을 가지고 있다가,
        포지션 계산에서 사용한다.
        폭이 0이상일 때마다 갱신되므로, 괜찮을 듯하다.
        향후에 show/hide 이벤트를 받을 수 있는 방법이 생기면, 개선하자.
      */
      this._colorbar_size = width
    }
  }
});
