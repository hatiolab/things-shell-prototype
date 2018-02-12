import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';

import { ReferenceMap, create } from '@hatiolab/things-scene';

import { ReduxMixin } from '../../reducer/redux-mixin';

class ThingsProvider extends ReduxMixin(PolymerElement) {

  static get is() { return 'things-provider'; }

  static get properties() {
    return {
      refProvider: {
        notify: true
      }
    }
  }

  ready() {
    this.requests = [];
    this.names = {};
    this.subscribers = {};

    this.refProvider = new ReferenceMap(

      async (boardName, resolve, reject) => {

        const url = `/boards/${boardName}`;

        try {
          const response = await fetch(url);
          const { board } = await response.json();
          const { name, model } = board;
          var scene;

          try {
            scene = await this.refProvider.get(name);
            console.warn("Board fetched more than twice.", name)

          } catch (e) {
            scene = create({
              model,
              mode: 0,
              refProvider: this.refProvider
            });

            // s.app.baseUrl = undefined;

            this.names[name] = scene
          }

          resolve(scene, board);

        } catch (e) {
          reject(e);
        }

      }, async (id, ref) => {

        var boardName;

        for (let name in this.names) {
          if (this.names[name] !== ref)
            continue
          boardName = name
        }

        delete this.names[boardName]

        // requestAnimationFrame(() => {
        ref.dispose();
        // })
      }
    )
  }
}

customElements.define(ThingsProvider.is, ThingsProvider);
