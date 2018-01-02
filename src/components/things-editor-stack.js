import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
스택 구조를 편집하는 컴포넌트이다.

새로운 층을 쌓거나 제거할 수 있으며, 기존 층의 상하 위치를 변경할 수 있다.

Example:

    <things-editor-stack stack="{{stack}}">
    </things-editor-stack>

@demo demo/index-editor-stack.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        display: block;
        @apply(--things-editor-stack);
      }

      #add-floor {
        width: 100%;
        height: 20px;
        background-color: blue;
        color: white;
      }

      div {
        background-color: blue;
        width: calc(100% - 40px);
        width: -webkit-calc(100% - 40px);
        min-height: 20px;
      }

      div.active {
        background-color: red;
      }

      div button {
        position: absolute;
        right: 10px;
        width: 30px;
        min-height: 20px;
      }
    </style>

    <button id="add-floor">+</button>

    <template id="floors" is="dom-repeat" items="[[stack]]" sort="_sortReverse">
      <template is="dom-if" if="{{_isActive(item)}}">
        <div class="active" on-click="_onClickToActive">[[item.name]]
          <button on-click="_onClickRemoveFloor">-</button>
        </div>
      </template>
      <template is="dom-if" if="{{!_isActive(item)}}">
        <div on-click="_onClickToActive">[[item.name]]
          <button on-click="_onClickRemoveFloor">-</button>
        </div>
      </template>
    </template>
`,

  is: 'things-editor-stack',

  behaviors: [
    IronResizableBehavior
  ],

  properties: {
    /**
     * `stack`은 stack에 의해 만들어진 층의 배열을 유지한다.
     */
    stack: {
      type: Array,
      notify: true
    },

    /**
     * `activeIndex`은 현재 active된 층의 인덱스를 유지한다.
     */
    activeIndex: {
      type: Number,
      notify: true,
      value: 0
    }
  },

  listeners: {
    'iron-resize': '_onIronResize',
    'add-floor.click': '_onClickAddFloor'
  },

  _onChangeProps: function (min, max, type) {
  },

  _onChangeValue: function (change) {
  },

  _onIronResize: function (e) {
  },

  _onClickAddFloor: function (e) {
    this.push('stack', {
      name: ''
    })
  },

  _onClickToActive: function (e) {
    if (e.target.tagName != 'DIV')
      return;

    var model = e.model;

    this.activeIndex = this.stack.indexOf(model.item);

    this.classFollows('active', e.target, this.querySelector('div.active'));
  },

  _onClickRemoveFloor: function (e) {
    var model = e.model;
    var idx = this.stack.indexOf(model.item);

    this.splice('stack', idx, 1);

    if (this.activeIndex >= this.stack.length && this.activeIndex > 0)
      this.activeIndex--;

    this.async(function () {
      var oldActive = this.querySelector('div.active');
      var idx = this.stack.length - this.activeIndex - 1;
      var newActive = this.querySelector('div:nth-of-type(' + (idx + 1) + ')');

      if (oldActive !== newActive)
        this.classFollows('active', newActive, oldActive);
    })
  },

  _sortReverse: function (a, b) {
    return this.stack.indexOf(a) < this.stack.indexOf(b);
  },

  _isActive: function (item) {
    var index = this.stack.indexOf(item);

    return (index === this.activeIndex);
  }
});
