import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn';
import {IronOverlayBehavior} from '@polymer/iron-overlay-behavior/iron-overlay-behavior';

/**
@license
Copyright © HatioLab Inc. All rights reserved.
*/
/**
An element providing a solution to no problem in particular.

Example:

  <popup-overlay>
    <x-element></x-element>
  </popup-overlay>

@demo demo/index-popup-overlay.html
@hero hero.svg
*/
Polymer({
  _template: `
    <style>
      :host {
        background: white;
        color: black;
        padding: 24px;
        box-shadow: rgba(0, 0, 0, 0.24) -2px 5px 12px 0px, rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
      }
    </style>
    <slot></slot>`,

  is: 'popup-overlay',

  behaviors: [
    IronOverlayBehavior
  ]
});
