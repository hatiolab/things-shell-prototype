module.exports = {
  width: 500,
  height: 500,
  components: [{
    type: 'text',
    top: 50,
    left: 30,
    textAlign: 'left',
    fontSize: '30',
    fontFamily: 'serif',
    text: `
이 예제에서는 가이드레이어를 설명합니다.
아닙니다. 마우스를 움직여보세요.
    `

  }, {
    type: 'rect',
    name: '첫번째 사각형',
    class: 'xxx yyy',
    left: 0,
    top: 150,
    rotation: 0,
    width: 100,
    height: 100,
    fillStyle: 'black'
  }, {
    type: 'rect',
    name: '두번째 사각형',
    class: 'xxx zzz',
    left: 0,
    top: 300,
    rotation: 0,
    width: 100,
    height: 100,
    fillStyle: 'red'
  }, {
    type: 'gauge-circle',
    cx: 250,
    cy: 250,
    rx: 100,
    ry: 100,
    fontSize: 40,
    fillStyle: '#ff00ff',
    fontColor: '#FF0000',
    lineWidth: 10,
    startAngle: 0,
    endAngle: 230,
    value: 65,
    startValue: 0,
    endValue: 240,
    step: 20,
    colorStops: [{
      position: 30,
      color: '#00ff00'
    }, {
      position: 100,
      color: '#ffff00'
    }, {
      position: 220,
      color: '#ff0000'
    }],
    textFillStyle: 'blue',
    stepFillStyle: 'gray',
    needleFillStyle: 'red',
    ratio: 70,
    subStep: 2,
    subTextSize: 5,
    strokeStyle: 'black',
    text: '#{value}%'
  }, {
    type: 'select',
    top: 300,
    left: 350,
    width: 280,
    height: 40,
    fontSize: 20,
    fillStyle: '#999999',
    fontColor: 'navy',
    strokeStyle: '#000',
    lineWidth: 5,
    value: 2,
    name: 'hahaha',
    options: [{
      text: 'HAHAHA',
      value: 1
    }, {
      text: 'HOHOHO',
      value: 2
    }, {
      text: 'HEHEHE',
      value: 3
    }]
  }, {
    "type": "table",
    "top": 255.19572953736656,
    "left": 454.62633451957294,
    "width": 499.99999999999994,
    "height": 200.0000000000001,
    "strokeStyle": "#999",
    "fillStyle": "white",
    "lineWidth": 2,
    "rows": 5,
    "columns": 5,
    "data": [
      [
        "header1",
        "header2",
        "header3"
      ],
      [
        100,
        200,
        300
      ],
      [
        1000,
        2000,
        3000
      ]
    ],
    "widths": [
      1,
      1,
      1,
      1,
      1
    ],
    "heights": [
      1,
      1,
      1,
      1,
      1
    ],
    "rotation": 0,
    "components": [
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 0,
        "top": 0,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 100,
        "top": 0,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 200,
        "top": 0,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 300,
        "top": 0,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 400,
        "top": 0,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 0,
        "top": 40.00000000000001,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 100,
        "top": 40.00000000000001,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 200,
        "top": 40.00000000000001,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 300,
        "top": 40.00000000000001,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 400,
        "top": 40.00000000000001,
        "width": 100,
        "height": 40.00000000000001,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 0,
        "top": 80.00000000000001,
        "width": 100,
        "height": 40.000000000000014,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 100,
        "top": 80.00000000000001,
        "width": 100,
        "height": 40.000000000000014,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 200,
        "top": 80.00000000000001,
        "width": 100,
        "height": 40.000000000000014,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 300,
        "top": 80.00000000000001,
        "width": 100,
        "height": 40.000000000000014,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 400,
        "top": 80.00000000000001,
        "width": 100,
        "height": 40.000000000000014,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 0,
        "top": 120.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 100,
        "top": 120.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 200,
        "top": 120.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 300,
        "top": 120.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 400,
        "top": 120.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 0,
        "top": 160.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 100,
        "top": 160.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 200,
        "top": 160.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 300,
        "top": 160.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      },
      {
        "type": "table-cell",
        "strokeStyle": "blue",
        "left": 400,
        "top": 160.00000000000003,
        "width": 100,
        "height": 40,
        "textWrap": true,
        "border": {
          "top": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "left": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "bottom": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          },
          "right": {
            "strokeStyle": "#999",
            "lineDash": "solid",
            "lineWidth": 1
          }
        },
        "rotation": 0
      }
    ]
  }
]
}
