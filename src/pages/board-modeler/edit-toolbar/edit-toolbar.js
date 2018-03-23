import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-toolbar/app-toolbar';
import '@polymer/paper-slider/paper-slider';
import '@polymer/paper-toast/paper-toast';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';

import '@polymer/neon-animation/animations/scale-up-animation';
import '@polymer/neon-animation/animations/fade-out-animation';
import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable';

import { ReduxMixin, createBoard, updateBoard } from '../../../reducer/redux-mixin';
import '../../../components/things-i18n-msg';

import style from './style.css';
import template from './html.template';

import '../../../layouts/page-toolbar/page-toolbar';

class EditToolbar extends ReduxMixin(PolymerElement) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
  `;
  }

  static get is() { return 'edit-toolbar'; }

  static get properties() {
    return {
      scene: {
        type: Object,
        notify: true,
        observer: 'onSceneChanged'
      },
      selected: {
        type: Array,
        notify: true,
        observer: 'onSelectedChanged'
      },
      hideProperty: {
        type: Boolean,
        notify: true,
        value: false
      },
      labelName: {
        value: 'SAMPLE',
        notify: true
      },
      variables: {
        type: Object
      },
      boardCurrent: {
        statePath: 'boardCurrent'
      },
      group: {
        statePath: 'boardGroupCurrent'
      },
      title: {
        computed: 'buildTitle(boardCurrent)'
      }
    }
  }

  buildTitle(boardCurrent) {
    return boardCurrent && boardCurrent.name || 'NO TITLE';
  }

  ready() {
    super.ready();

    window.addEventListener('paste', e => {
      this.cliped = e.clipboardData.getData('text/plain');
    });

    this.$['align-left'].addEventListener('tap', this.onTapAlign.bind(this));
    this.$['align-center'].addEventListener('tap', this.onTapAlign.bind(this));
    this.$['align-right'].addEventListener('tap', this.onTapAlign.bind(this));
    this.$['align-top'].addEventListener('tap', this.onTapAlign.bind(this));
    this.$['align-middle'].addEventListener('tap', this.onTapAlign.bind(this));
    this.$['align-bottom'].addEventListener('tap', this.onTapAlign.bind(this));
    this.$['undo'].addEventListener('tap', this.onTapUndo.bind(this));
    this.$['redo'].addEventListener('tap', this.onTapRedo.bind(this));
    this.$['front'].addEventListener('tap', this.onTapZorder.bind(this));
    this.$['back'].addEventListener('tap', this.onTapZorder.bind(this));
    this.$['forward'].addEventListener('tap', this.onTapZorder.bind(this));
    this.$['backward'].addEventListener('tap', this.onTapZorder.bind(this));
    this.$['fullscreen'].addEventListener('tap', this.onTapFullscreen.bind(this));
    this.$['cut'].addEventListener('tap', this.onTapCut.bind(this));
    this.$['copy'].addEventListener('tap', this.onTapCopy.bind(this));
    this.$['paste'].addEventListener('tap', this.onTapPaste.bind(this));
    this.$['delete'].addEventListener('tap', this.onTapDelete.bind(this));
    this.$['font-increase'].addEventListener('tap', this.onTapFontIncrease.bind(this));
    this.$['font-decrease'].addEventListener('tap', this.onTapFontDecrease.bind(this));
    this.$['group'].addEventListener('tap', this.onTapGroup.bind(this));
    this.$['ungroup'].addEventListener('tap', this.onTapUngroup.bind(this));
    this.$['symmetry-x'].addEventListener('tap', this.onTapSymmetryX.bind(this));
    this.$['symmetry-y'].addEventListener('tap', this.onTapSymmetryY.bind(this));
    this.$['rotate-cw'].addEventListener('tap', this.onTapRotateCW.bind(this));
    this.$['rotate-ccw'].addEventListener('tap', this.onTapRotateCCW.bind(this));
    this.$['toggle-property'].addEventListener('tap', this.onTapToggle.bind(this));
    this.$['fit-scene'].addEventListener('tap', this.onTapFitScene.bind(this));
    this.$['distribute-vertical'].addEventListener('tap', this.onTapDistribute.bind(this));
    this.$['distribute-horizontal'].addEventListener('tap', this.onTapDistribute.bind(this));
    this.$['preview'].addEventListener('tap', this.onTapPreview.bind(this));

    var modelerScene = this.parentNode.querySelector('things-scene-viewer');
    var modelerHtoolbar = this;

    var userOS = this._isMacOS()// OS가 맥인지 확인

    modelerScene.addEventListener('keydown', e => {
      this.onShortcut(e, userOS)
      modelerScene.focus();
    })
  }

  _isMacOS() {
    return navigator.userAgent.indexOf("Mac") != -1
  }

  getSymbol(key) {
    var symbol;
    switch (key) {
      case 'cmd':
      case 'ctrl':
        symbol = this._isMacOS() ? '⌘' : 'Ctrl'
        break;
      case 'shift':
        symbol = this._isMacOS() ? '⇧' : 'Shift'
        break;
      case 'alt':
      case 'option':
        symbol = this._isMacOS() ? '⌥' : 'Alt'
        break;
      case 'backspace':
        symbol = this._isMacOS() ? '⌫' : 'BackSpace'
        break;
      case 'delete':
        symbol = this._isMacOS() ? '⌦' : 'Del'
        break;
      default:
        symbol = key.toUpperCase();
        break;
    }

    return symbol;
  }

  getShortcutString() {
    var symbols = [];
    for (var i = 0; i < arguments.length; i++) {
      symbols.push(this.getSymbol(arguments[i]))
    }

    return symbols.join(this._isMacOS() ? '' : '+')
  }

  onShortcut(e, MacOS) {
    if (MacOS)
      var ctrlKey = e.metaKey
    else
      var ctrlKey = e.ctrlKey

    var altKey = e.altKey
    var shiftKey = e.shiftKey

    switch (e.code) {
      case 'KeyZ':
        if (ctrlKey && !shiftKey)
          this.onTapUndo()
        else if (ctrlKey && shiftKey)
          this.onTapRedo()
        break
      case 'KeyY':
        if (ctrlKey && !shiftKey)
          this.onTapRedo()
        else if (altKey && shiftKey)
          this.onTapSymmetryY()
        break
      case 'KeyC':
        if (ctrlKey && !shiftKey)
          this.onTapCopy()
        else if (altKey && shiftKey)
          this.onTapAlign('center')
        break
      case 'KeyX':
        if (ctrlKey && !shiftKey)
          this.onTapCut()
        else if (altKey && shiftKey)
          this.onTapSymmetryX()
        break
      case 'KeyV':
        if (ctrlKey && !shiftKey)
          this.onTapPaste()
        else if (altKey && shiftKey)
          this.onTapDistribute('VERTICAL')
        break
      case 'Delete':
      case 'Backspace':
        this.onTapDelete()
        break
      case 'KeyG':
        if (ctrlKey && !shiftKey)
          this.onTapGroup()
        else if (ctrlKey && shiftKey)
          this.onTapUngroup()
        break
      case 'KeyF':
        if (ctrlKey && !shiftKey)
          this.onTapZorder(forward)
        else if (ctrlKey && shiftKey)
          this.onTapZorder(front)
        break
      case 'KeyB':
        if (ctrlKey && !shiftKey)
          this.onTapZorder(backward)
        else if (ctrlKey && shiftKey)
          this.onTapZorder(back)
        else if (altKey && shiftKey)
          this.onTapAlign('bottom')
        break
      case 'Equal':
        if (ctrlKey)
          this.onTapZoom(zoomin)
        break
      case 'Minus':
        if (ctrlKey)
          this.onTapZoom(zoomout)
        break
      case 'KeyH':
        if (ctrlKey && !shiftKey)
          this.onTapToggle()
        else if (altKey && shiftKey)
          this.onTapDistribute('HORIZONTAL')
        break
      case 'F11':
        this.onTapFullscreen()
        break
      case 'KeyS':
        if (ctrlKey) {
          this.onTapSave();
          e.preventDefault();
        }
        break
      case 'KeyP':
        if (ctrlKey)
          this.onTapPreview()
        break
      case 'KeyA':
        if (ctrlKey)
          this.onTapSelectAll()
        break
      case 'KeyL':
        if (altKey && shiftKey)
          this.onTapAlign('left')
        break
      case 'KeyR':
        if (altKey && shiftKey)
          this.onTapAlign('right')
        break
      case 'KeyM':
        if (altKey && shiftKey)
          this.onTapAlign('middle')
        break
      case 'KeyT':
        if (altKey && shiftKey)
          this.onTapAlign('top')
        break
      case 'KeyY':
        if (altKey && shiftKey)
          this.onTapSymmetryY()
        break
      case 'KeyD':
        if (ctrlKey)
          this.onTapFitScene()
        break
      case 'KeyE':
        if (altKey && shiftKey)
          this.onTapRotateCW()
        else if (ctrlKey && shiftKey)
          this.onTapDownloadModel()
        break
      case 'KeyW':
        if (altKey && shiftKey)
          this.onTapRotateCCW()
        break
      case 'Digit1':
        if (ctrlKey)
          console.log('MODEL', this.scene && this.scene.model)
        break;
      case 'Digit2':
        if (ctrlKey)
          console.log('SELECTED', this.scene && this.scene.selected)
        break;
      case 'Digit3':
        if (ctrlKey)
          console.log('RESIDENTS', scene.Component.residents)
        break
    }
  }

  onExecute(command, undoable, redoable) {

    this.$.undo.disabled = !undoable
    this.$.redo.disabled = !redoable
  }

  onUndo(undoable, redoable) {

    this.$.undo.disabled = !undoable
    this.$.redo.disabled = !redoable
  }

  onRedo(undoable, redoable) {

    this.$.undo.disabled = !undoable
    this.$.redo.disabled = !redoable
  }

  onSceneChanged(after, before) {

    // if (before) {
    //   before.off('execute', this.onExecute, this)
    //   before.off('undo', this.onUndo, this)
    //   before.off('redo', this.onRedo, this)
    // }

    if (after) {
      after.on('execute', this.onExecute, this)
      after.on('undo', this.onUndo, this)
      after.on('redo', this.onRedo, this)
    }
  }

  onSelectedChanged(after, before) {

    var alignable = after.length > 1

    this.$['align-left'].disabled = !alignable
    this.$['align-center'].disabled = !alignable
    this.$['align-right'].disabled = !alignable
    this.$['align-top'].disabled = !alignable
    this.$['align-middle'].disabled = !alignable
    this.$['align-bottom'].disabled = !alignable

    var movable = after.length === 1

    /* forward, backward 이동은 한 컴포넌트만 가능하다. */
    this.$['forward'].disabled = !movable
    this.$['backward'].disabled = !movable

    /* 여러 컴포넌트는 front, back 이동이 가능하다. */
    this.$['front'].disabled = !(alignable || movable)
    this.$['back'].disabled = !(alignable || movable)
  }

  onTapUndo(e) {
    this.scene && this.scene.undo()
  }

  onTapRedo(e) {
    this.scene && this.scene.redo()
  }

  onTapCut(e) {
    this.scene && this.scene.cut()
  }

  onTapCopy(e) {
    var copied = this.scene && this.scene.copy();

    if (!copied)
      return;

    var textArea = document.createElement('textarea');
    textArea.style.position = 'absolute';
    textArea.style.opacity = '0';
    textArea.value = copied;
    document.body.appendChild(textArea);

    setTimeout(() => {
      textArea.select();

      let succeess = document.execCommand('copy');
      document.body.removeChild(textArea);
    }, 100);

    this.cliped = copied;
  }

  onTapPaste(e) {
    setTimeout(() => {
      this.scene && this.scene.paste(this.cliped)
    }, 100);
  }

  onTapDelete(e) {
    this.scene && this.scene.remove()
  }

  onTapSelectAll(e) {
    this.scene.select('(child)');
  }

  onTapFontIncrease(e) {
    var selected = this.scene.selected

    this.scene.undoableChange(function () {
      selected.forEach(function (component) {

        var fontSize = component.get('fontSize')

        if (!fontSize)
          fontSize = "15"

        if (fontSize) {
          var size = parseInt(fontSize)
          component.set('fontSize', size + 1)
        }
      })
    })
  }

  onTapFontDecrease(e) {
    var selected = this.scene.selected

    this.scene.undoableChange(function () {
      selected.forEach(function (component) {

        var fontSize = component.get('fontSize')

        if (!fontSize)
          fontSize = "15"

        if (fontSize) {
          var size = parseInt(fontSize)
          if (size > 1)
            component.set('fontSize', size - 1)
        }
      })
    })
  }

  onTapAlign(e) {

    if (!this.scene)
      return

    var selected = this.scene.selected
    if (selected.length <= 1)
      return

    if (e.target) {
      var button = e.target;

      while (!button.hasAttribute('data-align') && button !== document.body)
        button = button.parentElement;

      var align = button.getAttribute('data-align')
    } else {
      var align = e
    }

    this.scene.align(align)
  }

  onTapZorder(e) {
    if (!this.scene)
      return

    var selected = this.scene.selected
    if (selected.length < 1)
      return
    if (e.target) {
      var button = e.target;

      while (!button.hasAttribute('data-zorder') && button !== document.body)
        button = button.parentElement;

      var zorder = button.getAttribute('data-zorder')
    } else {
      var zorder = e.getAttribute('data-zorder')
    }

    this.scene.zorder(zorder)
  }

  onTapSymmetryX(e) {
    this.scene && this.scene.symmetryX()
  }

  onTapSymmetryY(e) {
    this.scene && this.scene.symmetryY()
  }

  onTapRotateCW(e) {
    if (!this.scene)
      return

    var selected = this.scene.selected

    this.scene.undoableChange(function () {
      selected.forEach(function (component) {

        var rotation = component.get('rotation')

        if (!rotation)
          rotation = 0

        component.set('rotation', (rotation + Math.PI / 2) % (Math.PI * 2))
      })
    })
  }

  onTapRotateCCW(e) {
    if (!this.scene)
      return

    var selected = this.scene.selected

    this.scene.undoableChange(function () {
      selected.forEach(function (component) {

        var rotation = component.get('rotation')

        if (!rotation)
          rotation = 0

        component.set('rotation', (rotation - Math.PI / 2) % (Math.PI * 2))
      })
    })
  }

  onTapGroup(e) {
    this.scene && this.scene.group()
  }

  onTapUngroup(e) {
    this.scene && this.scene.ungroup()
  }

  onTapFullscreen(e) {
    this.dispatchEvent(new CustomEvent('modeler-fullscreen'));
  }

  onTapToggle(e) {
    this.hideProperty = !this.hideProperty
  }

  onTapFitScene(e) {
    if (this.scene) {
      this.scene.resize();
      this.scene.fit('ratio');
    }
  }

  onTapPreview(e) {
    this.dispatchEvent(new CustomEvent('open-preview'));
  }

  onTapDownloadModel(e) {
    this.dispatchEvent(new CustomEvent('download-model'));
  }

  onTapDistribute(e) {
    if (!this.scene)
      return

    var selected = this.scene.selected
    if (selected.length <= 1)
      return
    if (e.target) {
      var button = e.target;

      while (!button.hasAttribute('data-distribute') && button !== document.body)
        button = button.parentElement;

      var distribute = button.getAttribute('data-distribute')
    } else {
      var distribute = e
    }

    this.scene.distribute(distribute)
  }

  createBoard() {
    try {
      this.scene.toDataURL('png', null, 400, 300)
        .then(url => {
          this.dispatch(createBoard(Object.assign({}, this.boardCurrent, {
            thumbnail: url,
            model: this.scene.model
          })));
        }, err => {
          console.error(err)

          this.dispatch(createBoard(Object.assign({}, this.boardCurrent, {
            model: this.scene.model
          })));
        })
    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e);
    }
  }

  updateBoard() {
    try {
      this.scene.toDataURL('png', null, 400, 300)
        .then(url => {
          this.dispatch(updateBoard(Object.assign({}, this.boardCurrent, {
            thumbnail: url,
            model: this.scene.model
          })));
        }, err => {
          console.error(err)

          this.dispatch(updateBoard(Object.assign({}, this.boardCurrent, {
            model: this.scene.model
          })));
        })
    } catch (e) {
      if (this.showToastMsg) this.showToastMsg(e);
    }
  }

  onTapSave(e) {
    if (!this.boardCurrent.name) {
      this.newBoardName = '';
      this.newBoardDescription = '';

      this.$['save-new-dialog'].open();
    } else {
      this.updateBoard();
    }
  }

  onSaveNewDialogClosed(e) {
    var dialog = e.target;

    if (!dialog.closingReason.confirmed)
      return;

    this.boardCurrent.name = this.newBoardName;
    this.boardCurrent.description = this.newBoardDescription;
    this.boardCurrent.group = this.group && this.group.name;

    this.createBoard();
  }

}

customElements.define(EditToolbar.is, EditToolbar);
