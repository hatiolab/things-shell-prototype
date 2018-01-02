import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class';
import {IronResizableBehavior} from '@polymer/iron-resizable-behavior/iron-resizable-behavior';

import {create as createScene} from '@hatiolab/things-scene';

import '@things-elements/things-scene-table';
import '@things-elements/things-scene-form';
import '@things-elements/things-scene-gauge';
import '@things-elements/things-scene-google-map';
// import '@things-elements/things-scene-chartjs'; /* chartjs dependency */
import '@things-elements/things-scene-random';
import '@things-elements/things-scene-firebase';
// import '@things-elements/things-scene-mqtt'; /* Paho dependency */

import './confidential-overlay';

import './things-shell-layer';
import './things-shell-handler';

export default class ThingsShell extends mixinBehaviors([IronResizableBehavior], PolymerElement) {

  static get is() {
    return 'things-shell';
  }

  static get template() {
    return `
    <style>
      :host {
        @apply(--things-shell);
      }
    </style>

    <slot></slot>`;
  }

  static get properties() {
    return {
      scene: {
        type: Object,
        notify: true
      },
      model: {
        type: Object
      },
      mode: {
        /* Scene Mode - mode 0 : view mode, mode 1 : edit mode, mode 2 : shift mode */
        type: Number,
        notify: true,
        value: 0
      },
      screenSize: {
        type: Number,
        value: 13.3
      },
      variables: {
        type: Object,
        notify: true
      },
      data: {
        type: Object
      },
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
      fit: {
        type: String,
        value: 'none'
      },
      selected: {
        type: Array,
        notify: true
      },
      disposeWhenDetached: {
        type: Boolean,
        value: true
      },
      baseUrl: {
        type: String
      },

      provider: {
        type: Object
      },

      /*
       * Scene Provider에 등록하기위한 name(id)
       */
      name: {
        type: String,
        value() {
          return 'viewer';
        }
      }
    };
  }

  static get observers() {
    return [
      '_onModelChanged(model)',
      '_onModeChanged(mode)',
      '_onDisplayChanged(screenSize)',
      '_onDataChanged(data)',
      '_onBaseUrlChanged(baseUrl)'
    ];
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.scene && this.disposeWhenDetached) {
      this._disposeScene();
    }
  }

  ready () {
    super.ready();

    this.addEventListener('iron-resize', () => {
      requestAnimationFrame(this.resize.bind(this));
    });
  }

  findAll(selector) {
    return this.scene.findAll(selector);
  }

  _disposeScene() {
    if (this.scene) {
      this.scene.off('selected', this._onSelectedChanged, this);
      this.scene.off('mode', this._onSceneModeChanged, this);

      if (this.provider) {
        this.scene.release();
      } else {
        this.scene.dispose();
      }

      this.scene = null;
      this.selected = [];
    }
  }

  resize() {
    if (this.scene) {
      if (this.fit === 'both' || Math.abs((this.offsetWidth - (this.lastOffsetWidth || 0))) >= 1) {
        this.scene.resize();
        this._fit();
      }

      this.lastOffsetWidth = this.offsetWidth;
    }
  }

  _onModelChanged(model) {
    this._disposeScene();

    if (!model) {
      return;
    }

    const layers = Array.from(this.querySelectorAll('things-shell-layer'))
    .map(layer => layer.getModel());

    const handlers = Array.from(this.querySelectorAll('things-shell-handler'))
    .map(handler => handler.getAttribute('type'));

    this.scene = createScene({
      target: this,
      model: JSON.parse(JSON.stringify(model)),
      layers,
      handlers,
      mode: this.mode,
      refProvider: this.provider
    });

    if (this.provider) {
      this.provider.add(this.name, this.scene);
    }

    this.scene.screen = this.screenSize;

    /* 이 컴포넌트의 폭이 값을 가지고 있으면 - 화면상에 자리를 잡고 보여지고 있음을 의미한다.
     * 이 때는 정상적으로 그려주고,
     * 그렇지 않으면, 다음 Resize Handling시에 처리하도록 한다.
     */
    this.resize();

    this.variables = model.variables || this.scene.variables;

    this.scene.on('selected', this._onSelectedChanged, this);
    this.scene.on('mode', this._onSceneModeChanged, this);

    this._onModeChanged(this.mode);
    this._onDisplayChanged(this.screenSize);
    this._onBaseUrlChanged(this.baseUrl);
  }

  _onDisplayChanged(screenSize) {
    if (!this.scene) {
      return;
    }

    if (screenSize) {
      this.scene.screen = parseFloat(screenSize);
    }
  }

  _onModeChanged(mode) {
    if (!this.scene) {
      return;
    }

    if (this.scene.mode !== parseFloat(mode)) {
      this.scene.mode = parseFloat(mode);
    }
  }

  _onDataChanged(data) {
    if (!this.scene || !data) {
      return;
    }

    this.scene.data = data;
  }

  _fit() {
    if (!this.scene) {
      return;
    }

    this.scene.fit(this.fit);
  }

  _onSelectedChanged(after) {
    this.selected = after;
  }

  _onSceneModeChanged(after) {
    if (!this.scene) {
      return;
    }

    if (this.mode !== after) {
      this.mode = after;
    }

    if (after === 2) {
      this.style.cursor = 'all-scroll';
    } else {
      this.style.cursor = 'default';
    }
  }

  _onBaseUrlChanged(after) {
    if (!this.scene) {
      return;
    }

    this.scene.app.baseUrl = after;
  }
}

customElements.define(ThingsShell.is, ThingsShell);
