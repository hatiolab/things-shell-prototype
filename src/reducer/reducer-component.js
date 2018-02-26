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
    type: 'half round rect',
    model: {
      type: 'half-roundrect',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      round: 30,
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
  }, {
    type: 'marker',
    model: {
      type: 'marker',
      left: 125,
      top: 100,
      width: 50,
      height: 100,
      fontColor: '#000000',
      fillStyle: '#333333',
      strokeStyle: '#000000',
      innerCircleFillStyle: '#ffffff',
      lineWidth: 0,
      alpha: 1,
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

function chartAndGauges() {
  return [{
    type: 'bar chart',
    model: {
      type: 'chartjs',
      top: 200,
      left: 300,
      width: 200,
      height: 200,
      lineWidth: 5,
      alpha: 1,
      chart: {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'series 1',
            type: 'bar',
            data: [],
            backgroundColor: 'rgb(66, 110, 164)',
            borderColor: 'rgb(66, 110, 164)',
            borderWidth: 0,
            dataKey: 'value',
            yAxisID: 'left'
          }],
          labelDataKey: 'color'
        },
        options: {
          theme: 'dark',
          xGridLine: false,
          yGridLine: true,
          legend: {
            display: true,
            position: 'top'
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                display: true
              }
            }],
            yAxes: [{
              id: 'left',
              position: 'left',
              gridLines: {
                display: true
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }, {
              id: 'right',
              position: 'right',
              display: false,
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }]
          }
        }
      },
      data: [{
        color: "Red",
        value: 12
      }, {
        color: "Blue",
        value: 19
      }, {
        color: "Yellow",
        value: 3
      }, {
        color: "Green",
        value: 5
      }, {
        color: "Purple",
        value: 2
      }, {
        color: "Orange",
        value: 3
      }]
    }
  }, {
    type: 'horizontal bar chart',
    model: {
      type: 'chartjs',
      top: 200,
      left: 300,
      width: 200,
      height: 200,
      lineWidth: 5,
      alpha: 1,
      chart: {
        type: 'horizontalBar',
        data: {
          labels: [],
          datasets: [{
            label: 'series 1',
            data: [],
            backgroundColor: 'rgb(66, 110, 164)',
            borderColor: 'rgb(66, 110, 164)',
            borderWidth: 0,
            dataKey: 'value1'
          }, {
            label: 'series 2',
            data: [],
            backgroundColor: "rgb(62, 196, 221)",
            borderColor: "rgb(62, 196, 221)",
            borderWidth: 0,
            dataKey: 'value2'
          }],
          labelDataKey: 'color'
        },
        options: {
          theme: 'dark',
          xGridLine: true,
          yGridLine: false,
          legend: {
            display: true,
            position: 'top'
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: true
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }],
            yAxes: [{
              id: 'left',
              position: 'left',
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }]
          }
        }
      },
      data: [{
        color: "Red",
        value1: 12,
        value2: 24
      }, {
        color: "Blue",
        value1: 19,
        value2: 9
      }, {
        color: "Yellow",
        value1: 3,
        value2: 6
      }, {
        color: "Green",
        value1: 5,
        value2: 2
      }, {
        color: "Purple",
        value1: 2,
        value2: 4
      }, {
        color: "Orange",
        value1: 3,
        value2: 1
      }]
    }
  }, {
    type: 'line chart',
    model: {
      type: 'chartjs',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      lineWidth: 5,
      chart: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: "series 1",
            type: 'line',
            backgroundColor: "rgb(66, 110, 164)",
            borderColor: "rgb(66, 110, 164)",
            borderWidth: 3,
            pointBorderColor: "rgb(66, 110, 164)",
            pointBorderWidth: 3,
            pointBackgroundColor: "rgba(255,255,255,1)",
            lineTension: 0.4,
            yAxisID: 'left',
            data: [],
            dataKey: 'value1',
            fill: false
          }, {
            label: "series 2",
            type: 'line',
            backgroundColor: "rgb(62, 196, 221)",
            borderColor: "rgb(62, 196, 221)",
            borderWidth: 3,
            pointBorderColor: "rgb(62, 196, 221)",
            pointBorderWidth: 3,
            pointBackgroundColor: "rgba(255,255,255,1)",
            lineTension: 0.4,
            yAxisID: 'left',
            data: [],
            dataKey: 'value2',
            fill: false
          }],
          labelDataKey: 'data'
        },
        options: {
          theme: 'dark',
          xGridLine: false,
          yGridLine: true,
          legend: {
            display: true,
            position: 'top'
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                display: true
              }
            }],
            yAxes: [{
              id: 'left',
              position: 'left',
              gridLines: {
                display: true
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }, {
              id: 'right',
              position: 'right',
              display: false,
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }]
          }
        }
      },
      data: [{
        data: "Data 1",
        value1: 20,
        value2: 60
      }, {
        data: "Data 2",
        value1: 30,
        value2: 10
      }, {
        data: "Data 3",
        value1: 80,
        value2: 40
      }, {
        data: "Data 4",
        value1: 20,
        value2: 30
      }, {
        data: "Data 5",
        value1: 40,
        value2: 80
      }, {
        data: "Data 6",
        value1: 10,
        value2: 30
      }, {
        data: "Data 7",
        value1: 60,
        value2: 20
      }]
    }
  }, {
    type: 'mixed chart',
    model: {
      type: 'chartjs',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      fontColor: '#FF0000',
      lineWidth: 5,
      chart: {
        type: 'bar',
        subType: 'mixed',
        data: {
          labels: [],
          datasets: [{
            type: 'line',
            label: "series 1",
            backgroundColor: "rgb(66, 110, 164)",
            borderColor: "rgb(66, 110, 164)",
            borderWidth: 3,
            pointBorderColor: "rgb(66, 110, 164)",
            pointBorderWidth: 3,
            pointBackgroundColor: "rgba(255,255,255,1)",
            lineTension: 0.4,
            fill: false,
            yAxisID: 'left',
            data: [],
            dataKey: 'value1'
          }, {
            type: 'bar',
            label: "series 2",
            backgroundColor: "rgb(62, 196, 221)",
            borderColor: "rgb(62, 196, 221)",
            borderWidth: 0,
            yAxisID: 'right',
            data: [],
            dataKey: 'value2'
          }],
          labelDataKey: 'data'
        },
        options: {
          theme: 'dark',
          multiAxis: true,
          xGridLine: false,
          yGridLine: true,
          legend: {
            display: true,
            position: 'top'
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                display: true
              }
            }],
            yAxes: [{
              position: 'left',
              id: 'left',
              gridLines: {
                display: true
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }, {
              id: 'right',
              position: 'right',
              display: true,
              gridLines: {
                display: false
              },
              scaleLabel: {
                labelString: '',
                display: false
              },
              ticks: {
                autoMin: true,
                autoMax: true,
                display: true
              }
            }]
          }
        }
      },
      data: [{
        data: "Data 1",
        value1: 20,
        value2: 60
      }, {
        data: "Data 2",
        value1: 30,
        value2: 10
      }, {
        data: "Data 3",
        value1: 80,
        value2: 40
      }, {
        data: "Data 4",
        value1: 20,
        value2: 30
      }, {
        data: "Data 5",
        value1: 40,
        value2: 80
      }, {
        data: "Data 6",
        value1: 10,
        value2: 30
      }, {
        data: "Data 7",
        value1: 60,
        value2: 20
      }]
    }
  }, {
    type: 'radar chart',
    model: {
      type: 'chartjs',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      fontColor: '#FF0000',
      lineWidth: 5,
      chart: {
        type: 'radar',
        data: {
          labels: [],
          datasets: [
            {
              label: "My First dataset",
              type: 'radar',
              backgroundColor: "rgb(66, 110, 164)",
              borderColor: "rgb(66, 110, 164)",
              pointBackgroundColor: "rgba(255,255,255,1)",
              pointBorderColor: "rgb(66, 110, 164)",
              data: [],
              fill: false,
              dataKey: 'rate1'
            },
            {
              label: "My Second dataset",
              type: 'radar',
              backgroundColor: "rgb(62, 196, 221)",
              borderColor: "rgb(62, 196, 221)",
              pointBackgroundColor: "rgba(255,255,255,1)",
              pointBorderColor: "rgb(62, 196, 221)",
              data: [],
              fill: false,
              dataKey: 'rate2'
            }
          ],
          labelDataKey: 'hobby'
        },
        options: {
          theme: 'dark',
          legend: {
            display: true,
            position: 'top'
          },
          scale: {
            ticks: {
            }
          }
        }
      },
      data: [{
        hobby: "Eating",
        rate1: 65,
        rate2: 28
      }, {
        hobby: "Drinking",
        rate1: 59,
        rate2: 48
      }, {
        hobby: "Sleeping",
        rate1: 90,
        rate2: 40
      }, {
        hobby: "Designing",
        rate1: 81,
        rate2: 19
      }, {
        hobby: "Coding",
        rate1: 56,
        rate2: 96
      }, {
        hobby: "Cycling",
        rate1: 55,
        rate2: 27
      }, {
        hobby: "Running",
        rate1: 40,
        rate2: 100
      }]
    }
  }, {
    type: 'polar area chart',
    model: {
      type: 'chartjs',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      fontColor: '#FF0000',
      lineWidth: 5,
      chart: {
        type: 'polarArea',
        data: {
          labels: [],
          datasets: [{
            label: "My First dataset",
            backgroundColor: [
              "rgba(248, 42, 18, 1)",
              "rgba(255,99,132,1)",
              "rgba(9, 64, 169, 1)",
              "rgba(24, 185, 87, 1)",
              "rgba(216, 100, 19, 1)",
              "rgba(82, 8, 99, 1)",
              "rgba(225, 102, 234, 1)"
            ],
            borderColor: "rgba(179,181,198,1)",
            borderWidth: 0,
            data: [],
            dataKey: 'rate1'
          }],
          labelDataKey: 'hobby'
        },
        options: {
          theme: 'dark',
          legend: {
            display: true,
            position: 'top'
          }
        }
      },
      data: [{
        hobby: "Eating",
        rate1: 65,
        rate2: 28
      }, {
        hobby: "Drinking",
        rate1: 59,
        rate2: 48
      }, {
        hobby: "Sleeping",
        rate1: 90,
        rate2: 40
      }, {
        hobby: "Designing",
        rate1: 81,
        rate2: 19
      }, {
        hobby: "Coding",
        rate1: 56,
        rate2: 96
      }, {
        hobby: "Cycling",
        rate1: 55,
        rate2: 27
      }, {
        hobby: "Running",
        rate1: 40,
        rate2: 100
      }]
    }
  }, {
    type: 'pie chart',
    model: {
      type: 'chartjs',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      fontColor: '#FF0000',
      lineWidth: 5,
      chart: {
        type: 'pie',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            borderWidth: 0,
            dataKey: 'value'
          }],
          labelDataKey: 'label'
        },
        options: {
          theme: 'dark',
          legend: {
            display: true,
            position: 'top'
          },
          animation: {
            animateScale: true
          }
        }
      },
      data: [{
        label: "A",
        value: 80
      }, {
        label: "B",
        value: 15
      }, {
        label: "C",
        value: 15
      }]
    }
  }, {
    type: 'doughnut chart',
    model: {
      type: 'chartjs',
      top: 0,
      left: 0,
      width: 200,
      height: 200,
      fontColor: '#FF0000',
      lineWidth: 5,
      chart: {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56"
            ],
            borderWidth: 0,
            dataKey: 'value'
          }],
          labelDataKey: 'label'
        },
        options: {
          theme: 'dark',
          legend: {
            display: true,
            position: 'top'
          },
          animation: {
            animateScale: true
          }
        }
      },
      data: [{
        label: "Red",
        value: 300
      }, {
        label: "Blue",
        value: 50
      }, {
        label: "Yellow",
        value: 100
      }]
    }
  },
  {
    type: 'gauge-circle',
    model: {
      type: 'gauge-circle',
      cx: 150,
      cy: 150,
      rx: 100,
      ry: 100,
      fontSize: 15,
      fillStyle: '#ff00ff',
      // strokeStyle: '#552555',
      fontColor: 'black',
      lineWidth: 0,
      value: 65,
      startValue: 0,
      endValue: 100,
      step: 20,
      colorStops: [
        {
          position: 50,
          color: '#76c045'
        },
        {
          position: 80,
          color: '#ffa302'
        },
        {
          position: 100,
          color: '#fd3c00'
        }],
      textFillStyle: '#585858',
      stepFillStyle: '#ffffff',
      needleFillStyle: '#585858',
      ratio: 70,
      startAngle: -120,
      endAngle: 120,
      subStep: 5,
      stepTextSize: 5,
      stepNeedleSize: 1,
      alpha: 1,
      showStartValue: true,
      showEndValue: true,
      showStepLine: true,
      showStepText: true,
      showSubStep: true,
      inText: true
    }
  }, {
    type: 'gauge-vertical',
    model: {
      type: 'gauge-vertical',
      top: 100,
      left: 100,
      width: 60,
      height: 200,
      value: 65,
      fontSize: 15,
      fontColor: '#585858',
      startValue: 0,
      endValue: 100,
      needleFillStyle: '#585858',
      stepFillStyle: '#ffffff',
      textFillStyle: '#585858',
      needleSize: 3,
      stepNeedleSize: 1,
      stepTextSize: 7,
      step: 20,
      subStep: 5,
      showStepText: true,
      showStartValue: true,
      showEndValue: true,
      showStepLine: true,
      showSubStep: true,
      colorStops: [
        {
          position: 50,
          color: '#76c045'
        },
        {
          position: 80,
          color: '#ffa302'
        },
        {
          position: 100,
          color: '#fd3c00'
        }],
      alpha: 1
    }
  }, {
    type: 'gauge-horizon',
    model: {
      type: 'gauge-horizon',
      top: 100,
      left: 100,
      width: 200,
      height: 60,
      value: 65,
      fontSize: 15,
      fontColor: '#585858',
      fillStyle: '#ff00ff',
      startValue: 0,
      endValue: 100,
      needleFillStyle: '#585858',
      stepFillStyle: '#ffffff',
      textFillStyle: '#585858',
      stepNeedleSize: 1,
      needleSize: 3,
      stepTextSize: 7,
      step: 20,
      subStep: 5,
      showStepText: true,
      showStartValue: true,
      showEndValue: true,
      showStepLine: true,
      showSubStep: true,
      colorStops: [
        {
          position: 50,
          color: '#76c045'
        },
        {
          position: 80,
          color: '#ffa302'
        },
        {
          position: 100,
          color: '#fd3c00'
        }],
      alpha: 1
    }
  }, {
    type: 'progress-vertical',
    model: {
      type: 'progress-vertical',
      top: 100,
      left: 100,
      width: 70,
      height: 200,
      value: 65,
      fontSize: 20,
      fontColor: '#fff',
      fontFamily: 'Arial',
      fillStyle: '#76c045',
      strokeStyle: '#585858',
      text: '#{value}%',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'progress-horizontal',
    model: {
      type: 'progress-horizontal',
      top: 100,
      left: 100,
      width: 200,
      height: 70,
      value: 65,
      reverse: false,
      fontSize: 20,
      fontColor: '#fff',
      fontFamily: 'Arial',
      fillStyle: '#76c045',
      strokeStyle: '#585858',
      text: '#{value}%',
      alpha: 1,
      hidden: false,
      lineWidth: 1,
      lineDash: 'solid',
      lineCap: 'butt'
    }
  }, {
    type: 'progress-circle',
    model: {
      type: 'progress-circle',
      cy: 150,
      cx: 150,
      rx: 70,
      ry: 70,
      value: 65,
      startAngle: 0,
      endAngle: 360,
      fontSize: 20,
      strokeStyle: '#76c045',
      blankStrokeStyle: '#ccc',
      fontFamily: 'Arial',
      fontColor: '#585858',
      text: '#{value}%',
      alpha: 1,
      hidden: false,
      lineWidth: 20,
      lineDash: 'solid',
      lineCap: 'round'
    }
  }, {
    type: 'echart',
    model: {
      type: 'echart',
      top: 0,
      left: 0,
      width: 400,
      height: 300,
      fontColor: "red",
      lineWidth: 1,
      series:
        `[{
name:'利润',
type:'bar',
label: {
normal: {
show: true,
position: 'inside'
}
},
data:[200, 170, 240, 244, 200, 220, 210]
}, {
name:'收入',
type:'bar',
stack: '总量',
label: {
normal: {
show: true
}
},
data:[320, 302, 341, 374, 390, 450, 420]
}, {
name:'支出',
type:'bar',
stack: '总量',
label: {
normal: {
show: true,
position: 'left'
}
},
data:[-120, -132, -101, -134, -190, -230, -210]
}]`,
      option:
        `{
tooltip : {
trigger: 'axis',
axisPointer : {
type : 'shadow'
}
},
legend: {
data:['利润', '支出', '收入']
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis : [{
type : 'value'
}],
yAxis : [{
type : 'category',
axisTick : {show: false},
data : ['周一','周二','周三','周四','周五','周六','周日']
}]
}`
    }
  }, {
    type: 'billboard',
    model: {
      type: 'billboard',
      top: 100,
      left: 100,
      width: 600,
      height: 400,
      fontSize: 10,
      fillStyle: '#00ff00',
      fontColor: '#FF0000',
      strokeStyle: '#000',
      lineWidth: 1,
      data: [
        ["data1", 30, 200, 100, 400, 150, 250],
        ["data2", 250, 150, 120, 300, 200, 30]
      ],
      config: `
  {
  type: "line"
  }`
    }
  }]
};

function table() {
  return [{
    type: 'table',
    model: {
      type: 'table',
      top: 100,
      left: 100,
      width: 500,
      height: 200,
      strokeStyle: '#999',
      fillStyle: 'white',
      lineWidth: 2,
      rows: 5,
      columns: 5,
      data: [
        ['header1', 'header2', 'header3'],
        [100, 200, 300],
        [1000, 2000, 3000]
      ]
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
  }, {
    type: 'three container',
    model: {
      type: 'three-container',
      left: 100,
      top: 100,
      width: 800,
      height: 600,
      fillStyle: 'darkgray',
      fov: 20,
      near: 0.1,
      far: 2000,
      zoom: 100,
      threed: false
    }
  }, {
    type: 'indoor map',
    model: {
      type: 'indoor-map',
      left: 100,
      top: 100,
      width: 200,
      height: 200,
      fontSize: 80,
      fontColor: '#585858',
      lineWidth: 1,
      activeIndex: 0,
      alpha: 1,
      components: [{
        type: 'floor',
        left: 0,
        top: 0,
        width: 600,
        height: 400,
        fontSize: 80,
        fontColor: '#585858',
        fillStyle: 'white',
        lineWidth: 0,
        alpha: 1
      }]
    }
  }, {
    type: 'tab',
    model: {
      type: 'tab',
      left: 100,
      top: 100,
      width: 100,
      height: 400,
      lineWidth: 5,
      fillStyle: 'navy',
      activeFillStyle: 'red',
      strokeStyle: 'white',
      fontColor: 'white'
    }
  }]
}

function dataSource() {
  return [{
    type: 'stomp',
    model: {
      type: "stomp",
      left: 10,
      top: 10,
      width: 100,
      height: 100,
      hidden: true,
      dataFormat: 'json'
    }
  }, {
    type: 'firebase',
    model: {
      type: 'firebase',
      top: 50,
      left: 50,
      width: 100,
      height: 100,
      apiKey: "AIzaSyBtJayCKxuU-_lPaZvbLmOgqFlynMIu_sM",
      authDomain: "things-rtls.firebaseapp.com",
      databaseURL: "https://things-rtls.firebaseio.com",
      projectId: "things-rtls",
      storageBucket: "things-rtls.appspot.com",
      messagingSenderId: "32358989541",
      childDataPath: "boards/template/data",
      email: 'test@example.com',
      password: 'testpass'
    }
  }, {
    type: 'restful',
    model: {
      type: "restful",
      left: 10,
      top: 10,
      width: 100,
      height: 100,
      hidden: true,
      dataFormat: 'json'
    }
  }, {
    type: 'random',
    model: {
      type: "random",
      left: 10,
      top: 10,
      width: 100,
      height: 100,
      hidden: true,
      dataFormat: 'json',
      format: 'integer',
      period: 5000,
      count: 1
    }
  }]
};

function IoTs() {
  return [{
    type: 'beacon',
    model: {
      type: 'beacon',
      left: 100,
      top: 100,
      zPos: 0,
      width: 100,
      height: 100
    }
  }, {
    type: 'humidity sensor',
    model: {
      type: 'humidity-sensor',
      cx: 150,
      cy: 150,
      zPos: 100,
      rx: 50,
      ry: 50,
      depth: 30,
      alpha: 1,
      hidden: false,
      humidity: [Math.floor(Math.random() * 40) - 10, Math.floor(Math.random() * 70)]
    }
  }]
};

function threeD() {
  return [{
    type: 'three container',
    model: {
      type: 'three-container',
      left: 100,
      top: 100,
      width: 800,
      height: 600,
      fillStyle: 'darkgray',
      fov: 20,
      near: 0.1,
      far: 2000,
      zoom: 100,
      threed: false
    }
  }, {
    type: 'cube',
    model: {
      type: 'cube',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      depth: 100,
      fillStyle: '#ffffff',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }, {
    type: 'cylinder',
    model: {
      type: 'cylinder',
      cx: 100,
      cy: 100,
      rx: 100,
      ry: 100,
      rz: 100,
      fillStyle: '#ffffff',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }, {
    type: 'sphere',
    model: {
      type: 'sphere',
      cx: 100,
      cy: 100,
      rx: 100,
      ry: 100,
      rz: 100,
      fillStyle: '#ffffff',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }, {
    type: 'banner',
    model: {
      type: 'banner',
      cx: 100,
      cy: 100,
      zPos: 0,
      width: 100,
      height: 10,
      depth: 50,
      fillStyle: '#ffffff',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }, {
    type: 'wall',
    model: {
      type: 'wall',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      depth: 50,
      fillStyle: '#ffffff',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }, {
    type: 'desk',
    model: {
      type: 'desk',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      depth: 50,
      fillStyle: '#CCAA76',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }]
};

function warehouse() {
  return [{
    type: 'visualizer',
    model: {
      type: 'visualizer',
      left: 100,
      top: 100,
      width: 800,
      height: 600,
      fillStyle: 'darkgray',
      fov: 60,
      near: 10,
      far: 10000,
      zoom: 100,
      threed: false
    }
  }, {
    type: 'rack-table',
    model: {
      type: 'rack-table',
      top: 100,
      left: 100,
      width: 500,
      height: 200,
      locPattern: '{z}{s}-{u}{sh}',
      increasePattern: '+u+s',
      strokeStyle: '#999',
      lineWidth: 2,
      rows: 5,
      columns: 5
    }
  }, {
    type: 'legend',
    model: {
      type: 'legend',
      left: 100,
      top: 100,
      width: 200,
      height: 150,
      fillStyle: '#efefef',
      direction: 'vertical',
      strokeStyle: 'rgba(0, 0, 0, 0.3)',
      lineWidth: 1
    }
  }, {
    type: 'rack',
    model: {
      type: 'rack',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      depth: 100,
      shelves: 1,
      locPattern: '{z}{s}-{u}-{sh}',
      shelfPattern: '#',
      fillStyle: '#ffffff',
      strokeStyle: '#999',
      lineWidth: 1,
      alpha: 1
    }
  }, {
    type: 'clone',
    model: {
      type: 'clone',
      top: 350,
      left: 100,
      width: 30,
      height: 30,
      strokeStyle: '#999',
      lineWidth: 1,
      lineStyle: '#999'
    }
  }, {
    type: 'conveyor',
    model: {
      type: 'conveyor',
      top: 350,
      left: 100,
      width: 500,
      height: 100,
      strokeStyle: '#999',
      lineWidth: 1,
      lineStyle: '#999',
      value: 1,
      rollWidth: 13
    }
  }, {
    type: 'conveyor-belt',
    model: {
      type: 'conveyor-belt',
      top: 500,
      left: 100,
      width: 500,
      height: 100,
      strokeStyle: '#999',
      lineWidth: 1,
      lineStyle: '#999',
      value: 1,
      conveyorType: 1,
      rollWidth: 13
    }
  }, {
    type: 'conveyor-join',
    model: {
      type: 'conveyor-join',
      cx: 100,
      cy: 150,
      rx: 100,
      ry: 100,
      startAngle: -Math.PI / 4,
      endAngle: Math.PI / 4,
      ratio: 34,
      lineWidth: 1,
      strokeStyle: 'black',
      value: 2,
      rollWidth: 12
    }
  }, {
    type: 'scanner',
    model: {
      type: 'scanner',
      top: 100,
      left: 450,
      width: 150,
      height: 100,
      lineWidth: 1,
      strokeStyle: '#999',
      fillStyle: 'transparent',
      value: 2,
      rollWidth: 3
    }
  }, {
    type: 'conveyor-join-trapezoid',
    model: {
      type: 'conveyor-join-trapezoid',
      lineWidth: 1,
      path: [{ x: 50, y: 150 }, { x: 150, y: 150 }, { x: 150, y: 250 }, { x: 100, y: 300 }, { x: 50, y: 250 }],
      strokeStyle: '#999',
      fillStyle: 'transparent',
      value: 3,
      rollWidth: 10
    }
  }, {
    type: 'wheel-sorter',
    model: {
      type: 'wheel-sorter',
      top: 50,
      left: 200,
      width: 200,
      height: 200,
      strokeStyle: '#999',
      fillStyle: 'transparent',
      lineWidth: 2,
      value: 1,
      tilt: 1
    }
  }, {
    type: 'person',
    model: {
      type: 'person',
      cx: 150,
      cy: 150,
      rx: 30,
      ry: 30,
      alpha: 1,
      hidden: false,
      lineWidth: 3,
      lineDash: 'solid',
      lineCap: 'round'
    }
  }, {
    type: 'forklift',
    model: {
      type: 'forklift',
      cx: 150,
      cy: 150,
      rx: 30,
      ry: 30,
      depth: 100,
      alpha: 1,
      hidden: false,
      lineWidth: 3,
      lineDash: 'solid',
      lineCap: 'round'
    }
  }]
};

function form() {

  var inputs01 = ['text', 'password', 'email', 'search', 'number', 'color', 'range', 'file', 'date'].map(function (type) {
    return {
      type: 'input-' + type,
      model: {
        type: 'input-' + type,
        top: 100,
        left: 100,
        width: 280,
        height: 30,
        paddingLeft: type == 'search' ? 0 : 7,
        paddingRight: type == 'search' ? 0 : 7,
        fontSize: 14,
        fillStyle: 'white',
        fontColor: '#585858',
        strokeStyle: 'rgba(0,0,0,.4)',
        lineWidth: type == 'file' ? 0 : 1,
        lineDash: 'solid',
        textAlign: 'left'
      }
    }
  })

  var inputs02 = ['submit', 'reset'].map(function (type) {
    return {
      type: 'input-' + type,
      model: {
        type: 'input-' + type,
        top: 100,
        left: 100,
        width: 280,
        height: 30,
        fontSize: 14,
        fillStyle: 'white',
        fontColor: '#585858',
        strokeStyle: 'rgba(0,0,0,.4)'
      }
    }
  })

  var button = ['button'].map(function (type) {
    return {
      type: type,
      model: {
        type: type,
        top: 100,
        left: 100,
        width: 280,
        height: 30,
        fontSize: 14,
        fillStyle: 'white',
        fontColor: '#585858',
        textAlign: 'center'
      }
    }
  })

  var textibles = ['input-radio', 'input-checkbox'].map(function (type) {
    return {
      type: type,
      model: {
        type: type,
        top: 100,
        left: 100,
        width: 280,
        height: 30,
        text: 'noname',
        fontSize: 14,
        fontColor: '#585858',
        textAlign: 'left'
      }
    }
  })

  var fieldset = ['fieldset', 'iframe', 'img', 'link'].map(function (type) {
    return {
      type: type,
      model: {
        type: type,
        top: 100,
        left: 100,
        width: 280,
        height: 30,
        fontSize: 14,
        fillStyle: 'white',
        fontColor: '#585858',
        strokeStyle: 'rgba(0,0,0,.4)',
        lineWidth: 1,
        lineDash: 'solid',
        textAlign: 'left'
      }
    }
  })

  var others = ['textarea', 'select'].map(function (type) {
    return {
      type: type,
      model: {
        type: type,
        top: 100,
        left: 100,
        width: 280,
        height: type == 'textarea' ? 60 : 40,
        paddingLeft: type == 'select' ? 0 : 7,
        paddingRight: type == 'select' ? 0 : 7,
        fontSize: 14,
        fillStyle: 'white',
        fontColor: '#585858',
        strokeStyle: 'rgba(0,0,0,.4)',
        lineWidth: 1,
        lineDash: 'solid',
        textAlign: 'left'
      }
    }
  })

  var form = [{
    type: 'form',
    model: {
      type: 'form',
      top: 100,
      left: 100,
      width: 400,
      height: 200,
      fontColor: '#585858',
      strokeStyle: '#ccc',
      lineWidth: 1,
      method: 'GET',
      action: '',
      name: 'search',
      authorization: '',
      format: 'TEXT'
    }
  }]

  return form.concat(inputs01, inputs02, button, textibles, fieldset, others)
};

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
  }, {
    type: 'clock-analog',
    model: {
      type: 'clock-analog',
      cx: 150,
      cy: 150,
      rx: 50,
      ry: 50,
      fillStyle: '#ffffff',
      strokeStyle: '#000000',
      lineWidth: 1,
      alpha: 1,
    }
  }, {
    type: 'clock-text',
    model: {
      type: 'clock-text',
      top: 100,
      left: 100,
      width: 100,
      height: 50,
      fontColor: '#000000',
      fontSize: 20,
      alpha: 1,
      localTime: true,
      utc: 0,
      timeFormat: 'YYYY-MM-DD HH:mm:ss'
    }
  }, {
    type: 'compass',
    model: {
      type: 'compass',
      cx: 150,
      cy: 150,
      rx: 50,
      ry: 50,
      value: 0,
      fontSize: 20,
      fontColoe: '#000',
      fillStyle: '#F2F2F2',
      strokeStyle: '#AAAAAA',
      lineWidth: 10,
      fontColor: '#ff0000',
      alpha: 1,
    }
  }, {
    type: 'google-map',
    model: {
      type: 'google-map',
      left: 150,
      top: 150,
      width: 300,
      height: 200,
      lat: 22.308117,
      lng: 114.225443,
      zoom: 20,
      apiKey: 'AIzaSyBgQZb-SFqjQBC_XTxNiz0XapejNwV9PgA'
    }
  }, {
    type: 'gmap-marker',
    model: {
      type: 'gmap-marker',
      left: 150,
      top: 150,
      width: 40,
      height: 60,
      lat: 22.308117,
      lng: 114.225443,
      fillStyle: '#00ff00',
      hidden: true
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
    chartAndGauge: chartAndGauges(),
    table: table(),
    container: container(),
    dataSource: dataSource(),
    IoT: IoTs(),
    '3D': threeD(),
    warehouse: warehouse(),
    form: form(),
    etc: etc()
  }
};

import elements from '../things-scene-components-with-tools.import';

for (let element in elements) {
  let templates = elements[element].templates;

  templates.forEach(t => {
    let {
      group,
      template,
      icon
    } = t;

    console.log('template', template)
    STATE.groupComponents[group].push(template);
  });
}

export default function (state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
