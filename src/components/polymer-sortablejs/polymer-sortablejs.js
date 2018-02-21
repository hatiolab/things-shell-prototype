import { Element as PolymerElement } from '@polymer/polymer/polymer-element';
import Sortable from './sortable';

class SortableJS extends PolymerElement {
  static get template() {
    return `
      <slot></slot>
  `;
  }

  static get is() { return 'sortable-js'; }

  static get properties() {
    return {
      group: { type: Object, value: () => { return { name: Math.random() }; }, observer: "groupChanged" },
      sort: { type: Boolean, value: true, observer: "sortChanged" },
      disabled: { type: Boolean, value: false, observer: "disabledChanged" },
      store: { type: Object, value: null, observer: "storeChanged" },
      handle: { type: String, value: null, observer: "handleChanged" },
      scrollSensitivity: { type: Number, value: 30, observer: "scrollSensitivityChanged" },
      scrollSpeed: { type: Number, value: 10, observer: "scrollSpeedChanged" },
      ghostClass: { type: String, value: "sortable-ghost", observer: "ghostClassChanged" },
      chosenClass: { type: String, value: "sortable-chosen", observer: "chosenClassChanged" },
      ignore: { type: String, value: "a, img", observer: "ignoreChanged" },
      filter: { type: Object, value: null, observer: "filterChanged" },
      animation: { type: Number, value: 0, observer: "animationChanged" },
      dropBubble: { type: Boolean, value: false, observer: "dropBubbleChanged" },
      dragoverBubble: { type: Boolean, value: false, observer: "dragoverBubbleChanged" },
      dataIdAttr: { type: String, value: "data-id", observer: "dataIdAttrChanged" },
      delay: { type: Number, value: 0, observer: "delayChanged" },
      forceFallback: { type: Boolean, value: false, observer: "forceFallbackChanged" },
      fallbackClass: { type: String, value: "sortable-fallback", observer: "fallbackClassChanged" },
      fallbackOnBody: { type: Boolean, value: false, observer: "fallbackOnBodyChanged" },
      draggable: {},
      scroll: {}
    }
  }

  constructor() {
    super();

    // override default DOM property behavior
    Object.defineProperties(this, {
      draggable: { get: function () { return this._draggable || this.getAttribute("draggable") || ">*"; }, set: function (value) { this._draggable = value; this.draggableChanged(value); } },
      scroll: { get: function () { return this._scroll || JSON.parse(this.getAttribute("scroll") || "true"); }, set: function (value) { this._scroll = value; this.scrollChanged(value); } }
    });
  }

  connectedCallback() {
    // Given
    //   <sortable-js>
    //     <template is="dom-repeat" items={{data}}>
    //       <div>
    //         <template is="dom-if" if="true">
    //           <span>hello</span></template></div>
    // After render, it becomes
    //   <sortable-js>
    //     <div>
    //       <span>hello</span>
    //       <template is="dom-if">
    //     <tempalte is="dom-repeat">
    this.initialize();
  }

  disconnectedCallback() {
    this.destroy();
  }

  initialize() {
    var templates = this.querySelectorAll("template[is='dom-repeat']");
    var template = templates[templates.length - 1];

    var options = {};
    Object.keys(SortableJS.properties).forEach(function (key) {
      options[key] = this[key];
    }.bind(this));

    var _this = this;
    var eventCallbacks = {
      onUpdate: function (e) {
        if (template) {
          template.splice("items", e.newIndex, 0, template.splice("items", e.oldIndex, 1)[0]);
          /*
          if (manuallyHandleUpdateEvents) {
            template.items.splice(e.newIndex, 0, template.items.splice(e.oldIndex, 1)[0]);
          } else {
            template.splice("items", e.newIndex, 0, template.splice("items", e.oldIndex, 1)[0]);
          }
          */
        }
        _this.dispatchEvent(new CustomEvent("update", { bubbles: true, composed: true, detail: e }));
      },

      onAdd: function (e) {
        if (template) {
          var froms = e.from.querySelectorAll("template[is='dom-repeat']");
          var from = froms[froms.length - 1];
          var model = from.modelForElement(e.item);
          template.splice("items", e.newIndex, 0, model.item);
          e.model = model;
        }
        _this.dispatchEvent(new CustomEvent("add", { bubbles: true, composed: true, detail: e }));
      },

      onRemove: function (e) {
        // Donot remove if group.pull is clone
        if (e.target.group.pull === 'clone') {
          return false;
        }
        if (template) {
          var item = template.splice("items", e.oldIndex, 1)[0];
          e.model = { item: item };
        }
        _this.dispatchEvent(new CustomEvent("remove", { bubbles: true, composed: true, detail: e }));
      },

      onChoose: function (e) {
        _this.dispatchEvent(new CustomEvent("choose", { bubbles: true, composed: true, detail: e }));
      },

      onStart: function (e) {
        _this.dispatchEvent(new CustomEvent("start", { bubbles: true, composed: true, detail: e }));
      },

      onEnd: function (e) {
        _this.dispatchEvent(new CustomEvent("end", { bubbles: true, composed: true, detail: e }));
      },

      onSort: function (e) {
        _this.dispatchEvent(new CustomEvent("sort", { bubbles: true, composed: true, detail: e }));
      },

      onFilter: function (e) {
        _this.dispatchEvent(new CustomEvent("filter", { bubbles: true, composed: true, detail: e }));
      },

      onMove: function (e) {
        _this.dispatchEvent(new CustomEvent("move", { bubbles: true, composed: true, detail: e }));
      },

      onClone: function (e) {
        _this.dispatchEvent(new CustomEvent("clone", { bubbles: true, composed: true, detail: e }));
      }
    };

    Object.keys(eventCallbacks).forEach(function (name) {
      options[name] = eventCallbacks[name];
    });

    this.sortable = Sortable.create(this, options);
  }

  destroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
  }

  groupChanged(value) {
    if (typeof (value) === 'string') {
      return this.set('group', { name: value });
    }
    this.sortable && this.sortable.option("group", value);
  }

  sortChanged(value) { this.sortable && this.sortable.option("sort", value); }

  disabledChanged(value) { this.sortable && this.sortable.option("disabled", value); }

  storeChanged(value) { this.sortable && this.sortable.option("store", value); }

  handleChanged(value) { this.sortable && this.sortable.option("handle", value); }

  scrollChanged(value) { this.sortable && this.sortable.option("scroll", value); }

  scrollSensitivityChanged(value) { this.sortable && this.sortable.option("scrollSensitivity", value); }

  scrollSpeedChanged(value) { this.sortable && this.sortable.option("scrollSpeed", value); }

  draggableChanged(value) { this.sortable && this.sortable.option("draggable", value); }

  ghostClassChanged(value) { this.sortable && this.sortable.option("ghostClass", value); }

  chosenClassChanged(value) { this.sortable && this.sortable.option("chosenClass", value); }

  ignoreChanged(value) { this.sortable && this.sortable.option("ignore", value); }

  filterChanged(value) { this.sortable && this.sortable.option("filter", value); }

  animationChanged(value) { this.sortable && this.sortable.option("animation", value); }

  dropBubbleChanged(value) { this.sortable && this.sortable.option("dropBubble", value); }

  dragoverBubbleChanged(value) { this.sortable && this.sortable.option("dragoverBubble", value); }

  dataIdAttrChanged(value) { this.sortable && this.sortable.option("dataIdAttr", value); }

  delayChanged(value) { this.sortable && this.sortable.option("delay", value); }

  forceFallbackChanged(value) { this.sortable && this.sortable.option("forceFallback", value); }

  fallbackClassChanged(value) { this.sortable && this.sortable.option("fallbackClass", value); }

  fallbackOnBodyChanged(value) { this.sortable && this.sortable.option("fallbackOnBody", value); }
}

customElements.define(SortableJS.is, SortableJS);
