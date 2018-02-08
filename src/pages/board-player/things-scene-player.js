import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
// <link rel="import" href="../../bower_components/iron-resizable-behavior/iron-resizable-behavior.html">

class BoardPlayer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles">${style}</style>

      ${template}
    `;
  }

  static get is() { return 'board-player'; }

  static get properties() {
    return {
    }
  }


<dom-module id="things-scene-player">
  <template>
    <style>
      :host {
        display: block;
        width: 100%;
      }
    </style>
  </template>

  <script>
    (function () {
      'use strict';

    Polymer({
      is: 'things-scene-player',

        behaviors: [
          Polymer.IronResizableBehavior
        ],

        properties: {
      sceneName: {
      type: String,
            observer: 'onSceneNameChanged'
          },
          fit: {
      /*
       * 캔바스에 모델을 어떻게 적절하게 보여줄 것인지를 설정한다.
       *
       * @none 가로, 세로 스케일을 1로 고정하고, {0, 0}좌표로 translate시킨다.
       * @both 캔바스에 모델을 꼭 채우도록 가로, 세로 스케일을 조정하고, {0, 0}좌표로 translate시킨다.
       * @width 캔바스의 폭에 모델의 폭을 일치하도록 가로, 세로 스케일을 동일하게 조정하고, {0, 0}좌표로 translate시킨다.
       * @height 캔바스의 높이에 모델의 높이를 일치하도록 가로, 세로 스케일을 동일하게 조정하고, {0, 0}좌표로 translate시킨다.
       * @center 가로, 세로 스케일을 1로 고정하고 모델이 화면의 중앙에 위치하도록 translate시킨다.
       * @ratio 모델의 모든 부분이 캔바스에 최대 크기로 표현될 수 있도록 가로, 세로 동일한 스케일로 조정하고, {0, 0}좌표로 translate시킨다.
       */
      type: String,
            value: 'ratio'
          },
          provider: {
      type: Object,
            observer: "onSceneNameChanged"
          }
        },

        listeners: {
      'iron-resize': '_onIronResize',
        },

        attached: function () {
      this.async(this.notifyResize, 1);
    },

        detached: function () {
      this._releaseRef()
    },

        _onIronResize: function (e) {
          if (this.scene) {
      this.scene.resize();

    if (this.offsetWidth) {
      this._fit();
    }
          }
        },

        _releaseRef: function () {
          if (this.scene) {
      this.scene.target = null;
    this.scene.release()
            delete this.scene
          }
        },

        onSceneNameChanged: function () {
          if (!this.provider)
            return

          this._releaseRef()

          if (!this.sceneName)
            return

          var self = this

          this.provider.get(this.sceneName, true)
          .then(function(scene) {

      self.scene = scene
            self.scene.target = self

            /* 이 컴포넌트의 폭이 값을 가지고 있으면 - 화면상에 자리를 잡고 보여지고 있음을 의미한다.
              * 이 때는 정상적으로 그려주고,
              * 그렇지 않으면, 다음 Resize Handling시에 처리하도록 한다.
              */
            if (self.offsetWidth)
              self._fit()
            }, function(e) {
    })
        },

        _fit: function () {
          if (!this.scene)
            return;

          this.scene.fit(this.fit);
        }

      });
    })();
  </script>
</dom-module>
