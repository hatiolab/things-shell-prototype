import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';

import '@polymer/neon-animation/animations/scale-up-animation';
import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';

import { ReduxMixin, fetchGroupList, fetchBoardList, newGroup, changeLocation } from '../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import './group-card';

class ShellDrawer extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles">${style}</style>

    ${template}
    `;
  }

  static get is() { return 'shell-drawer'; }

  static get properties() {
    return {
      boardGroupList: {
        type: Array,
        statePath: 'boardGroupList'
      },
      selected: {
        type: Number,
        value: 0
      }
    }
  }

  ready() {
    super.ready();

    this.dispatch(fetchGroupList());
  }

  onGroupClicked(e) {
    var card = e.target;
    var name = card.name;

    if (!name)
      return;

    if (name == '+') {
      this.newGroupName = '';
      this.newGroupDescription = '';

      this.$['new-group-dialog'].open();
    } else {
      this.dispatch(changeLocation('list', name));
    }
  }

  onNewGroupDialogClosed(e) {
    var dialog = e.target;

    if (!dialog.closingReason.confirmed)
      return;

    var group = {
      name: this.newGroupName,
      description: this.newGroupDescription
    }

    this.dispatch(newGroup(group));
  }
}

customElements.define(ShellDrawer.is, ShellDrawer);
