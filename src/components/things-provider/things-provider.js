import { PolymerElement, html } from '@polymer/polymer/polymer-element';

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
    this.refProvider = new ReferenceMap(

      async (boardName, resolve, reject) => {

        const url = `/boards/${boardName}`;

        try {
          const response = await fetch(url);
          const { board } = await response.json();
          const { name, model } = board;
          var scene;

          try {
            scene = await this.refProvider.get(boardName);
            console.warn("Board fetched more than twice.", boardName);

          } catch (e) {
            scene = create({
              model,
              mode: 0,
              refProvider: this.refProvider
            });

            // s.app.baseUrl = undefined;
          }

          resolve(scene, board);

        } catch (e) {
          reject(e);
        }

      }, async (id, ref) => {

        ref.dispose();
      }
    )

    window.provider = this.refProvider;
  }
}

customElements.define(ThingsProvider.is, ThingsProvider);
