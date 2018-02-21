/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/

/**
polymer element for code-mirror code editor.

Example:

  <things-editor-code value="{{text}}">
  </things-editor-code>

@demo demo/index-editor-code.html
@hero hero.svg
*/

import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import CodeMirrorStyle from 'codemirror/lib/codemirror.css';
import FullScreenStyle from 'codemirror/addon/display/fullscreen.css';
import NightThemeStyle from 'codemirror/theme/night.css';

import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/display/fullscreen';

export default class ThingsEditorCode extends PolymerElement {

  static get is() {
    return 'things-editor-code';
  }

  static get template() {
    return `
      <style>
        :host {
          display: block;
          position: relative;

          @apply(--things-editor-code)
        }

        textarea {
          display: block;
          height: 100%;
          width: 100%;
          resize: none;
          font-size: 16px;
          line-height: 20px;
          border: 0px;
          padding: 0px;
        }

        ${CodeMirrorStyle}
        ${FullScreenStyle}
        ${NightThemeStyle}
      </style>

      <textarea></textarea>
    `;
  }

  static get properties() {
    return {
      /**
       * `value`는 에디터에서 작성중인 contents이다.
       */
      value: {
        type: String,
        notify: true
      }
    }
  }

  static get observers() {
    return [
      '_valueChanged(value)'
    ]
  }

  ready() {
    super.ready();

    if (!this.editor) {
      this.editor = CodeMirror.fromTextArea(this.shadowRoot.querySelector("textarea"), {
        value: this.value,
        mode: 'javascript',
        tabSize: 2,
        lineNumbers: false,
        showCursorWhenSelecting: true,
        theme: "night",
        extraKeys: {
          "F11": function (cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          "Esc": function (cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"))
          }
        }
      });

      this.editor.on('change', e => {
        this._changedOnThis = true
        this.set('value', this.editor.getValue());
        this._changedOnThis = false
      })
    }
  }

  _valueChanged(value) {
    if (this._changedOnThis) {
      this.dispatchEvent(new CustomEvent('change'));
      return
    }

    if (this.editor)
      this.editor.setValue(value == undefined ? '' : String(value))
  }
}

customElements.define(ThingsEditorCode.is, ThingsEditorCode);
