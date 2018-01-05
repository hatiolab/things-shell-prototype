import '@polymer/polymer/polymer-element';
import style from './things-shell-theme.css';

const div = document.createElement('div');
div.setAttribute('style', 'display: none;');

div.innerHTML = `
<dom-module id="things-shell-theme">
  <template>
    <style>
    ${style}
    </style>
  </template>
</dom-module>`;

document.head.appendChild(div);
