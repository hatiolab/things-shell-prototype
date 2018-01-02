import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import ace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/src-min-noconflict/mode-javascript';
import 'ace-builds/src-min-noconflict/theme-monokai';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
ace-editor의 polymer element이다.

Example:


  <things-editor-script id="editor"
                        value="{{text}}"
                        theme="ace/theme/monokai"
                        mode="ace/mode/javascript">
  </things-editor-script>

@demo demo/index-editor-script.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {
        display: block;
        position: relative;

        width: 100%;
        height: 100%;
        @apply(--things-editor-script)
      }

      #container {
        width: 100%;
        height: 100%;
      }
    </style>
    <div id="container"></div>
`,

  is: 'things-editor-script',

  properties: {
    /**
     * `value`는 에디터에서 작성중인 contents이다.
     */
    value: {
      type: String,
      notify: true
    },

    theme: {
      type: String
    },

    mode: {
      type: String
    },

    fontsize: {
      type: Number
    },

    softtabs: {
      type: String
    },

    tabsize: {
      type: Number,
      value: 2
    },

    readonly: {
      type: Boolean
    },

    wrapmode: {
      type: Boolean
    },

    editor: {
      type: Object
    },

    gutter: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_configEditor(theme, mode, fontsize, softtabs, tabsize, readonly, wrapmode)',
    '_valueChanged(value)'
  ],

  attached: function () {
    this._attached = true

    var self = this;

    if (!this.editor) {
      this.editor = ace.edit(this.$.container, {
        initialContent: this.value
      })

      if (!this.gutter)
        this.editor.renderer.setShowGutter(this.gutter)

      // inject base editor styles
      this._injectTheme('#ace_editor\\.css');
      this._injectTheme('#ace-tm');

      this.editor.getSession().on('change', function (event) {
        self._changedOnThis = true
        self.set('value', self.editor.getValue())
        self._changedOnThis = false
      });
    }

    // prevent to warning logs ..
    this.editor.$blockScrolling = Infinity

    // handle theme changes
    this.editor.renderer.addEventListener("themeLoaded", this._onThemeLoaded.bind(this));

    // initial attributes
    this._configEditor()

  },

  detached: function () {
    this._attached = false
  },

  _configEditor: function (theme, mode, fontsize, softtabs, tabsize, readonly, wrapmode) {
    if (!this.editor || !this._attached)
      return

    this.editor.setTheme(this.theme);
    this.editor.setFontSize(this.fontsize);
    this.editor.setReadOnly(this.readonly);

    this.editor.commands.addCommand({
      name: 'fullscreen',
      exec: function(editor) {

        function _fullscreen_callback(e) {
          editor.resize();

          if (!document.fullscreen && !document.mozFullScreen && !document.webkitIsFullScreen && !document.msFullscreenElement) {
            ["fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "MSFullscreenChange"].forEach(
              event => document.removeEventListener(event, _fullscreen_callback)
            );
          }
        }

        ["fullscreenchange", "mozfullscreenchange", "webkitfullscreenchange", "MSFullscreenChange"].forEach(
          event => document.addEventListener(event, _fullscreen_callback)
        );

        var container = editor.container;

        if (container.requestFullScreen)
          container.requestFullScreen();
        else if (container.webkitRequestFullScreen)
          container.webkitRequestFullScreen();
        else if (container.mozRequestFullScreen)
          container.mozRequestFullScreen();
        else if (container.msRequestFullscreen)
          container.msRequestFullscreen();

        editor.resize()
      },
      bindKey: {mac: "cmd-enter|f11", win: "ctrl-enter|f11"}
    })

    var session = this.editor.getSession();

    session.setOption("useWorker", false);
    session.setMode(this.mode);
    session.setUseSoftTabs(this.softtabs);
    this.tabsize && session.setTabSize(this.tabsize);
    session.setUseWrapMode(this.wrapmode);
  },

  _valueChanged: function (value) {
    if (this._changedOnThis) {
      this.fire('change', value)
      return
    }

    if (this.editor)
      this.editor.setValue(value == undefined ? '' : String(value))
  },

  _onThemeLoaded: function (e) {
    var themeId = "#" + e.theme.cssClass;
    this._injectTheme(themeId);

    // Workaround Chrome stable bug, force repaint
    this.style.display = 'none';
    this.offsetHeight;
    this.style.display = '';
  },

  // inject the style tag of a theme to the element
  _injectTheme: function (themeId) {
    var n = document.querySelector(themeId);
    this.appendChild(this._cloneStyle(n));
  },

  //helper function to clone a style
  _cloneStyle: function (style) {
    var s = document.createElement('style');
    s.id = style.id;
    s.textContent = style.textContent;
    return s;
  }
});
