import rect from '../../assets/images/components/rect.png';
import ellipse from '../../assets/images/components/ellipse.png';
import donut from '../../assets/images/components/donut.png';
import triangle from '../../assets/images/components/triangle.png';
import polygon from '../../assets/images/components/polygon.png';
import star from '../../assets/images/components/star.png';
import line from '../../assets/images/components/line.png';
import dash from '../../assets/images/components/dash.png';
import singleArrow from '../../assets/images/components/single-arrow.png';
import bothArrow from '../../assets/images/components/both-arrow.png';
import polyline from '../../assets/images/components/polyline.png';
import text from '../../assets/images/components/text.png';
import colorImage from '../../assets/images/components/color-image.png';
import grayImage from '../../assets/images/components/gray-image.png';
import container from '../../assets/images/components/container.png';
import infoWindow from '../../assets/images/components/info-window.png';
import localReference from '../../assets/images/components/local-reference.png';
import globalReference from '../../assets/images/components/global-reference.png';

function shapes() {
  return [{
    type: 'rect',
    description: 'rectangle shape',
    icon: rect,
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
    type: 'ellipse',
    description: 'ellipse shape',
    icon: ellipse,
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
    description: 'donut shape',
    icon: donut,
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
    description: 'triangle shape',
    icon: triangle,
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
    description: 'polygon shape',
    icon: polygon,
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
    description: 'star shape',
    icon: star,
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
    description: 'simple line',
    icon: line,
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
    description: 'dash line',
    icon: dash,
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
    description: 'single arrow tip line',
    icon: singleArrow,
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
    description: 'both arrow tip line',
    icon: bothArrow,
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
    description: 'polyline',
    icon: polyline,
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
    description: 'text',
    icon: text,
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
    description: 'color image',
    icon: colorImage,
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
    description: 'gray scale line',
    icon: grayImage,
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

function groupContainer() {
  return [{
    type: 'container',
    description: 'general container',
    icon: container,
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
    type: 'info-window',
    description: 'information window',
    icon: infoWindow,
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
    description: 'local reference',
    icon: localReference,
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
    description: 'global reference',
    icon: globalReference,
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
      description: 'Group ' + group
    }
  }),
  groupComponents: {
    shape: shapes(),
    line: lines(),
    textAndMedia: textAndMedias(),
    chartAndGauge: [],
    table: [],
    container: groupContainer(),
    dataSource: [],
    IoT: [],
    '3D': [],
    warehouse: [],
    form: [],
    etc: etc()
  }
};

export default function (state = STATE, action) {
  switch (action.type) {
    case 'MODULE-PLUGIN':

      let elements = action.elements;
      let newstate = Object.assign({}, state);

      for (let element in elements) {
        let templates = elements[element].templates;

        templates.forEach(template => {
          let group = newstate.groupComponents[template.group];
          if (!group) {
            console.warn('Invalid group', group, template);
          } else {
            group.push(template);
          }
        });
      }

      return newstate;

    default:
      return state
  }
}
