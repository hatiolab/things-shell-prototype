import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';
/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <things-editor-action mapping="{{mapping}}"
                       type="[[type]]">
  </things-editor-action>

@demo demo/index-editor-action.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
       :host {}
    </style>

    <paper-icon-button icon\$="[[icon]]" on-click="_onClick"></paper-icon-button>
`,

  is: 'things-editor-action',

  properties: {
    icon: String
  },

  _onClick: function (e) {
    this.fire('action-editor-clicked', this.action)
  }
});
