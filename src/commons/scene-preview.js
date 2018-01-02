import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior';

import * as scene from '@hatiolab/things-scene';

export default class ScenePreview extends mixinBehaviors([IronResizableBehavior], PolymerElement) {

  static get is() {
    return 'scene-preview';
  }

  static get template() {
    return `
    <style>
      :host {
        width:100%;
        height: 100%;

        display: flex;
        flex-direction: column;

        overflow:hidden;
        margin:0 !important;
        padding:0 !important
      }

      div {
        flex: 1;
        background-color: white;
      }
    </style>

    <div id="target">
    </div>
      `;
  }

  static get properties() {
    return {
      model: {
        type: Object,
        observer: 'onModelChanged'
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
      baseUrl: {
        type: String,
        value: ''
      },
      provider: Object
    }
  }

  /**
   * Preview에 사용된 Scene을 dispose.
   */

  ready () {
    super.ready();

    this.addEventListener('iron-resize', () => {
      requestAnimationFrame(() => {
        if(!this.scene)
          return;
        this.scene.resize();
        this.scene.fit(this.fit);
      });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.scene && this.disposeWhenDetached) {
      if(this.scene)
        this.scene.target = null;
      delete this.scene
    }
  }

  onModelChanged() {

    if(!this.model)
      return

    this.scene = scene.create({
      target: this.$.target,
      model: this.model,
      mode: 0, /* View Mode */
      refProvider: this.provider
    });

    this.scene.app.baseUrl = this.baseUrl;
    this.scene.fit(this.fit);
  }
}

customElements.define(ScenePreview.is, ScenePreview);
