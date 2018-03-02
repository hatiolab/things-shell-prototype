function shapes() {
  return [{
    type: 'rect',
    model: {
      type: 'rect',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'ellipses',
    model: {
      type: 'ellipse',
      rx: 50,
      ry: 50,
      cx: 150,
      cy: 150,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'donut',
    model: {
      type: 'donut',
      rx: 50,
      ry: 50,
      cx: 150,
      cy: 150,
      ratio: 30,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'triangle',
    model: {
      type: 'triangle',
      x1: 150,
      y1: 100,
      x2: 100,
      y2: 200,
      x3: 200,
      y3: 200,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'polygon',
    model: {
      type: 'polygon',
      path: [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 200 }, { x: 100, y: 200 }],
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'star',
    model: {
      type: 'star',
      rx: 50,
      ry: 50,
      cx: 150,
      cy: 150,
      ratio: 30,
      wing: 5,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }]
};

function lines() {
  return [{
    type: 'line',
    model: {
      type: 'line',
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 200,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 3,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'dash',
    model: {
      type: 'line',
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 200,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 3,
      lineDash: 'round-dot',
      lineCap: 'butt'
    }
  }, {
    type: 'single arrow',
    model: {
      type: 'line',
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 200,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 3,
      hidden: false,
      lineWidth: 3,
      lineDash: 'solid',
      begin: 'arrow',
      lineCap: 'butt'
    }
  }, {
    type: 'both arrow',
    model: {
      type: 'line',
      x1: 100,
      y1: 100,
      x2: 200,
      y2: 200,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 3,
      lineDash: 'solid',
      begin: 'arrow',
      end: 'arrow',
      lineCap: 'butt'
    }
  }, {
    type: 'polyline',
    model: {
      type: 'polyline',
      path: [{ x: 100, y: 100 }, { x: 200, y: 100 }, { x: 200, y: 200 }, { x: 100, y: 200 }],
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }]
};

function textAndMedias() {
  return [{
    type: 'text',
    model: {
      type: 'text',
      left: 100,
      top: 100,
      width: 200,
      height: 50,
      text: 'Text',
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 5,
      lineDash: 'solid',
      lineCap: 'butt',
      textAlign: 'left',
      textBaseline: 'top',
      textWrap: false,
      fontFamily: 'serif',
      fontSize: 30,
    }
  }, {
    type: 'color image',
    model: {
      type: 'image-view',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      isGray: false,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'gray image',
    model: {
      type: 'image-view',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      isGray: true,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }]
};

function container() {
  return [{
    type: 'container',
    model: {
      type: 'container',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fillStyle: '#fff',
      strokeStyle: '#999',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }]
}

function etc() {
  return [{
    type: 'info. window',
    model: {
      type: "info-window",
      left: 10,
      top: 10,
      width: 50,
      height: 50,
      fillStyle: "#fff",
      strokeStyle: "DarkGoldenRod",
      hidden: true,
      frontSideTemplate: "<h2 id='xxx'>\n\t<%= text %>\n</h2>\n<img src='https://www.tutorialspoint.com/images/html.gif' alt='HTML Tutorial' height='150' width='140' />",
      backSideTemplate: "<h2 id='yyy'>\n\t<%= text %>\n</h2>\n<img src='https://www.tutorialspoint.com/images/html.gif' alt='HTML Tutorial' height='150' width='140' />",
      style: "#yyy {\n\tbackground-color:navy;\n\tcolor:white\n}\n#xxx, #yyy {\n\twhite-space:nowrap;\n\tmin-width:200px;\n}"
    }
  }, {
    type: 'local reference',
    model: {
      type: 'local-ref',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'global reference',
    model: {
      type: 'global-ref',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fillStyle: '#fff',
      strokeStyle: '#000',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }]
};

const STATE = {
  groupList: [
    "line",
    "shape",
    "textAndMedia",
    "chartAndGauge",
    "table",
    "container",
    "dataSource",
    "IoT",
    "3D",
    "warehouse",
    "form",
    "etc"
  ].map(group => {
    return {
      name: group,
      description: 'Component Group ' + group
    }
  }),
  groupComponents: {
    shape: shapes(),
    line: lines(),
    textAndMedia: textAndMedias(),
    chartAndGauge: [],
    table: [],
    container: container(),
    dataSource: [],
    IoT: [],
    '3D': [],
    warehouse: [],
    form: [],
    etc: etc()
  }
};

// import elements from '../things-scene-components-with-tools.import';

// for (let element in elements) {
//   let templates = elements[element].templates;

//   templates.forEach(t => {
//     let {
//       group,
//       template,
//       icon
//     } = t;

//     STATE.groupComponents[group].push(template);
//   });
// }

export default function (state = STATE, action) {
  switch (action.type) {
    case 'MODULE-PLUGIN':

      let elements = action.elements;
      let newstate = Object.assign({}, state);

      for (let element in elements) {
        let templates = elements[element].templates;

        templates.forEach(t => {
          let {
            group,
            template,
            icon
          } = t;

          newstate.groupComponents[group].push(template);
        });
      }

      return newstate;

    default:
      return state
  }
}
