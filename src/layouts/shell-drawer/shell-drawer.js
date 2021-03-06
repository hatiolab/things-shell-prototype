import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/hardware-icons';

import '@polymer/neon-animation/animations/scale-up-animation';
import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';

import { ReduxMixin, fetchGroupList, createGroup, setRoute, joinGroup } from '../../reducer/redux-mixin';
import '../../components/things-i18n-msg';

import style from './style.css';
import template from './html.template';

import GroupCard from './group-card';

class ShellDrawer extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

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
      },
      boardGroupCurrent: {
        type: Object,
        statePath: 'boardGroupCurrent'
      },
      drawerCollapsed: {
        type: Boolean,
        statePath: 'drawer.collapsed'
      }
    }
  }

  static get observers() {
    return [
      'onBoardGroupChanged(boardGroupCurrent, boardGroupList)'
    ]
  }

  ready() {
    super.ready();

    this.dispatch(fetchGroupList());
  }

  onRouteSetting(e) {
    var route = e.target.getAttribute('data-route');

    this.dispatch(setRoute(route));
  }

  onClickLogo(e) {
    this.dispatch({
      type: 'CLOSE-DRAWER'
    })
  }

  onBoardGroupChanged(boardGroupCurrent, boardGroupList) {

    /* group-card 엘리먼트들이 만들어지기를 기다려서, 처리한다. */
    setTimeout(() => {
      this.root.querySelectorAll('group-card').forEach(element => {
        if (boardGroupCurrent.name == element.group.name)
          element.setAttribute('active', true);
        else
          element.removeAttribute('active');
      });
    }, 100);
  }

  onGroupClicked(e) {

    var card = e.target;
    var group = card.group;

    if (!group)
      return;

    this.dispatch(setRoute('list', group.name));
  }

  onClickNewGroup(e) {
    this.newGroupName = '';
    this.newGroupDescription = '';
    this.newGroupType = 'group';

    this.$['new-group-dialog'].open();
  }

  onNewGroupDialogClosed(e) {
    var dialog = e.target;

    if (!dialog.closingReason.confirmed || !this.newGroupName)
      return;

    var group = {
      name: this.newGroupName,
      description: this.newGroupDescription,
      type: this.newGroupType
    }

    this.dispatch(createGroup(group));
    this.dispatch(setRoute('list', name));
  }

  onCardDrop(e) {
    e.preventDefault();

    var card = e.target;
    var board = e.dataTransfer.getData('board');

    card.dim(false);

    try {

      this.dispatch(joinGroup(board, card.group.name));
    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e);
    }
  }

  onCardDragOver(e) {
    e.preventDefault();

    var card = e.target;
    var board = e.dataTransfer.getData('board');

    card.dim(true);

    // console.log('onCardDragOver', board);
  }

  onCardDragLeave(e) {
    e.preventDefault();

    var card = e.target;
    var board = e.dataTransfer.getData('board');

    card.dim(false);

    // console.log('onCardDragLeave', board);
  }
}

customElements.define(ShellDrawer.is, ShellDrawer);
