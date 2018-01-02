import {Element as PolymerElement} from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';

import {ReduxMixin} from '../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import './component-menu/component-menu';

class ComponentToolbar extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
      <style include="shared-styles">${style}</style>

      ${template}
    `;
  }

  static get is() { return 'component-toolbar'; }

  static get properties() {
    return {
      componentGroupList: {
        type: Object,
        statePath: 'component.groupList'
      },
      group: String,
      scene: Object,
      mode: Number
    }
  }

  ready () {
    super.ready();

    this.addEventListener('click', this.onTapTools.bind(this));
    this.$.shift.addEventListener('click', this.onTapShift.bind(this));
  }

  isShiftMode (mode) {
    return mode === 2
  }

  onTapShift (e) {

    this.mode = this.$.shift.active ? 2 : 1
  }

  onTapTools (e) {

    var button = e.path[0];

    while (button && !button.hasAttribute('data-group') && button !== document.body)
      button = button.parentNode;

    if(!button || button == document.body)
      return;

    this.group = button.getAttribute('data-group');

    if (!this.group || button.tagName !== 'PAPER-BUTTON')
      return;

    this.$.menu.open();

    var right = this.getBoundingClientRect().right;
    this.$.menu.style['left'] = right + 'px';
  }
}

customElements.define(ComponentToolbar.is, ComponentToolbar);
