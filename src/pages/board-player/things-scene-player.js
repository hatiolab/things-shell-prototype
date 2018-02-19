import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';

class ThingsScenePlayer extends mixinBehaviors([IronResizableBehavior], PolymerElement) {

  static get is() { return 'things-scene-player'; }

  static get template() {
    return html`
      <style include="shared-styles">
      :host {
        display: block;
        width: 100%;
      }

      #root {
        width: 100%;
        height: 100%;
      }
      </style>

      <div id='root'></div>
    `;
  }

  static get properties() {
    return {
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
        type: Object
      }
    }
  }

  ready() {
    super.ready();

    this.addEventListener('iron-resize', () => {
      requestAnimationFrame(() => {
        if (this.scene) {
          this.scene.resize();

          if (this.offsetWidth) {
            this._fit();
          }
        }
      });
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.async(this.notifyResize, 1);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._releaseRef()
  }

  _releaseRef() {
    if (this.scene) {
      this.scene.target = null;
      this.scene.release()
      delete this.scene
    }
  }

  onSceneNameChanged() {
    if (!this.provider)
      return

    this._releaseRef()

    if (!this.sceneName)
      return

    var self = this;

    this.provider.get(this.sceneName, true)
      .then(function (scene) {

        self.scene = scene
        self.scene.target = self.$.root;

        /* 이 컴포넌트의 폭이 값을 가지고 있으면 - 화면상에 자리를 잡고 보여지고 있음을 의미한다.
        * 이 때는 정상적으로 그려주고,
        * 그렇지 않으면, 다음 Resize Handling시에 처리하도록 한다.
        */
        if (self.$.root.offsetWidth)
          self._fit()
      }, function (e) {
      })
  }

  _fit() {
    if (!this.scene)
      return;

    this.scene.fit(this.fit);
  }
}

customElements.define(ThingsScenePlayer.is, ThingsScenePlayer);
