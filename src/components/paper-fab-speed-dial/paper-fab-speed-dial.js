import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior';
import '@polymer/neon-animation/animations/scale-up-animation';
import '@polymer/neon-animation/animations/scale-down-animation';
import '@polymer/neon-animation/animations/cascaded-animation';
import '@polymer/paper-fab/paper-fab';

const isElement = (node) => node.nodeType === 1;

class PaperFabSpeedDial extends mixinBehaviors([NeonAnimationRunnerBehavior], PolymerElement) {

  static get is() { return 'paper-fab-speed-dial'; }

  static get template() {
    return html`
    <style>
      :host {
        display: flex;
        flex-flow: column-reverse;
        position: var(--paper-fab-speed-dial-position, absolute);
        bottom: var(--paper-fab-speed-dial-bottom, 10px);
        right: var(--paper-fab-speed-dial-right, 10px);
        @apply --paper-fab-speed-dial;
      }

      ::slotted(div) {
        display: grid;
        grid-row-gap: 10px;
      }

      #content {
        margin: 0px 8px 10px 8px;
      }

      :host([hidden]), ::slotted([hidden]) {
        display: none !important;
      }
    </style>

    <slot id="triggerSlot"></slot>

    <div id="content">
      <slot id="contentSlot" name="dropdown-content"></slot>
    </div>
    `;
  }

  static get properties() {
    return {

      active: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
        observer: 'activeChanged',
      },

      animationConfig: {
        type: Object,
        value: null,
      },

      dropdownContent: {
        type: Object,
        readOnly: true,
        observer: 'dropdownContentChanged',
      },

      triggerElement: {
        type: Object,
        readOnly: true,
      },

    };
  }

  connectedCallback() {
    super.connectedCallback();
    // eslint-disable-next-line max-len
    this.addEventListener('neon-animation-finish', this.onNeonAnimationFinish.bind(this));

    this.triggerNodeObserver =
      new FlattenedNodesObserver(this.$.triggerSlot, (info) => {
        this._setTriggerElement(info.addedNodes.filter(isElement).pop());
        this.triggerElement.addEventListener('tap', (e) => this.toggle(e));
      });

    this.contentSlotObserver =
      new FlattenedNodesObserver(this.$.contentSlot, (info) => {
        this._setDropdownContent(info.addedNodes.filter(isElement).pop());
      });
  }

  toggle() {
    this.active = !this.active;
  }

  activeChanged(active) {
    if (active) this.dropdownContent.hidden = false;
    const animation = active ? 'entry' : 'exit';
    this.playAnimation(animation);
  }

  dropdownContentChanged(dropdownContent) {
    dropdownContent.hidden = true;
    const array = Array.from(dropdownContent.children);
    const reversed = [...array].reverse();
    this.animationConfig = {
      'entry': {
        name: 'cascaded-animation',
        animation: 'scale-up-animation',
        nodes: reversed,
      },
      'exit': {
        name: 'cascaded-animation',
        animation: 'scale-down-animation',
        nodes: array,
      }
    };
  }

  onNeonAnimationFinish() {
    this.dropdownContent.hidden = !this.active;
  }
}

customElements.define(PaperFabSpeedDial.is, PaperFabSpeedDial);
