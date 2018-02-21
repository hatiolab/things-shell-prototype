/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import {Layer as SceneLayer, Component as SceneComponent} from '@hatiolab/things-scene';

export default class ConfidentialOverlay extends SceneLayer {

  _draw(context) {
    context.globalAlpha = 0.3;

    context.font = '50px Verdana';
    context.fillStyle = 'red';

    context.fillText(this.get('text') || 'CONFIDENTIAL', 20, 60);
  }
}

SceneComponent.register('confidential-overlay', ConfidentialOverlay);
