import { Element as PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { IronResizableBehavior } from '@polymer/iron-resizable-behavior/iron-resizable-behavior';
import '@polymer/iron-icons/editor-icons';

import { ReduxMixin } from '../../../../reducer/redux-mixin';

import style from './style.css';
import template from './html.template';

import '../../../../components/things-i18n-msg';
import '../../../../components/things-editor-value';

const PROPS = ['', 'text', 'fillStyle', 'strokeStyle', 'fontColor', 'rotation', 'hidden', 'location', 'dimension', 'value', 'data']
  .map(name => {
    return {
      name, label: name
    }
  });

class PropertyDataBinding extends mixinBehaviors([IronResizableBehavior], ReduxMixin(PolymerElement)) {
  static get template() {
    return `
    <style include="shared-styles">
    ${style}
    </style>

    ${template}
  `;
  }

  static get is() { return 'property-data-binding'; }

  static get properties() {
    return {
      model: {
        // type: Array,
        notify: true,
        value() {
          return []
        }
      },

      props: {
        computed: '_computeProps(target)'
      },

      config: {
        type: Object,
        value() {
          return {
            rowIndicator: {
              displayValue: DataLudi.RowIndicatorValue.ROW_INDEX,
              minWidth: 20,
              rowIndexBase: 0
            },
            footer: {
              visible: false
            },
            operateOptions: {
              sortingEnabled: false
            },
            displayOptions: {
              columnMovable: false,
              // columnExcludable: true,
              rowHoverMask: true,
              fitStyle: DataLudi.GridFitStyle.EVEN
            },
            editOptions: {
              autoCommit: true,
              insertable: true,
              appendable: true,
              erasable: true,
              appendWhenExitLast: true,
              editable: true,
              insertByCell: true,
              pasteByCell: true,
              updateByCell: true,
              crossWhenExitFirst: true,
              crossWhenExitLast: true,
              commitOnLastCell: true,
              selectionBasePaste: true,
              deletable: true
            },
            options: {
              vscrollBar: {
                visible: true,
                barWidth: 8,
                barIndent: "fixed",
                buttonLocation: 'hidden',
                styles: {
                  background: "#10000000"
                }
              },
              hscrollBar: {
                visible: true,
                barWidth: 8,
                barIndent: "fixed",
                buttonLocation: 'hidden'
              }
            }
          }
        }
      },

      jsonData: {
        type: String,
        value: 'JSON'
      },

      tableData: {
        type: Array,
        value: [{}]
      },

      gridModel: {
        value() {
          return [{
            "fieldName": "__field1"
          }, {
            "fieldName": "__field2"
          }, {
            "fieldName": "__field3"
          }, {
            "fieldName": "__field4"
          }, {
            "fieldName": "__field5"
          }, {
            "fieldName": "__field6"
          }, {
            "fieldName": "__field7"
          }, {
            "fieldName": "__field8"
          }, {
            "fieldName": "__field9"
          }, {
            "fieldName": "__field10"
          }, {
            "fieldName": "__field11"
          }, {
            "fieldName": "__field12"
          }]
        }
      },

      columns: {
        value() {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (i) {
            return {
              "name": "field" + i,
              "fieldName": "__field" + i,
              // "width": "90",
              "header": {
                "text": "Field " + i
              }
            }
          })
        }
      }
    }
  }

  static get observers() {
    return [
      'onModelChanged(model)',
      'onMappingChanged(mapping.*)',
      'onCurrentMappingIndexChanged(currentMappingIndex)',
      'onChangeTableData(tableData)',
      'onChangeJSONData(jsonData)'
    ]
  }

  ready() {
    super.ready();

    this.addEventListener('iron-resize', () => {
      requestAnimationFrame(this._onResize.bind(this));
    });
  }

  onModelChanged(model) {
    /* this.currentMappingIndex 의 강제 변경을 일으킴 */
    this.currentMappingIndex = null
    this.currentMappingIndex = 0
    if (!model.data)
      this.set('model.data', [{}])
  }

  onChangeTableData(after) {
    this.set('model.data', after)
  }

  onChangeJSONData(after) {
    try {
      var obj = JSON.parse(after)
      this.set('model.data', obj)
    } catch (e) {
      this.set('model.data', after)
    }
  }

  onModelChanged(model) {
    /* this.currentMappingIndex 의 강제 변경을 일으킴 */
    this.currentMappingIndex = null
    this.currentMappingIndex = 0

    var data = model.data

    if (this.dataEditorType(model) == 'table') {
      this.tableData = data || []
    } else {
      this.jsonData = typeof (data) !== 'object' ? data : JSON.stringify(data, null, 1)
    }

    // 데이터 프로퍼티 탭이 최초 활성화 된 후 모델 변경시 데이터루디 그리드 그려지지 않는 문제 해결을 위해
    this.grid && this.grid.resetSize()
    // this.notifyResize()
  }

  onMappingChanged(change) {

    var last = -1
    var mappings = (this.model.mappings && this.model.mappings.slice()) || []

    for (let i = 0; i < 7; i++) {
      var mapping = mappings[i]
      var tab = this.shadowRoot.querySelector(`paper-tab[data-mapping="${i + 1}"]`)

      if (mapping) {
        tab.active = true
        tab.disabled = false
        tab.setAttribute('has-set', true)

        last = i
      } else {
        tab.active = false
        tab.removeAttribute('has-set')
        tab.disabled = (last < i - 1)
      }
    }

    if (change.path === 'mapping') {
      if (this.mapping && this.mapping.target) {
        let targets = this.scene && this.scene.findAll(this.mapping.target, this.scene.selected[0]).forEach((c, i) => {
          if (i == 0)
            c.trigger('tagreset')
          c.trigger('tag', {})
        })
      }
      return
    }

    var mapping = this.mapping

    if (mapping.target && mapping.property && mapping.rule) {
      mappings[this.currentMappingIndex] = mapping
    }
    else
      mappings[this.currentMappingIndex] = null

    this.set('model.mappings', mappings.filter(function (m) { return !!m }))
  }

  onCurrentMappingIndexChanged(currentMappingIndex) {
    var mappings = this.model.mappings || []

    this.mapping = mappings[currentMappingIndex] || {
      rule: 'value'
    }
  }

  onThingsGridConfigured(e) {
    this.grid = e.detail
    var self = this

    // 마우스가 grid 밖으로 나갈 때 edit이 완료 되는 문제때문에...
    this.$$('#grid')._onMouseout = function () { };

    this.$$('#grid').dataSet.onDataChanged = function (ds) {
      self.set('model.data', ds.getRowObjects())
    }
  }

  _onResize(e) {
    this.grid && this.grid.resetSize()
  }

  _computeProps(target) {
    return PROPS.concat((target && target.nature && target.nature.properties) || []);
  }

  dataEditorType(model) {
    return (model && (model.type == 'table' || model.type == 'chartjs')) ? 'table' : 'json'
  }
}

customElements.define(PropertyDataBinding.is, PropertyDataBinding);
