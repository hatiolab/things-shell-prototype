const STATE = {
  'legend': {
    element: 'property-editor-legend'
  },
  'number': {
    element: 'property-editor-number'
  },
  'angle': {
    element: 'property-editor-angle'
  },
  'string': {
    element: 'input',
    properties: {
      type: 'text'
    }
  },
  'textarea': {
    element: 'property-editor-textarea'
  },
  'checkbox': {
    element: 'property-editor-checkbox',
    type: 'checkbox'
  },
  'select': {
    element: 'property-editor-select',
    properties: {
      options: 'options'
    }
  },
  'color': {
    element: 'property-editor-color'
  },
  'solid-color-stops': {
    element: 'property-editor-solid-colorstops',
    properties: {
      min: 'min',
      max: 'max'
    }
  },
  'gradient-color-stops': {
    element: 'property-editor-gradient-colorstops',
    properties: {
      min: 'min',
      max: 'max'
    }
  },
  'multiple-color': {
    element: 'property-editor-multiple-color'
  },
  'chartjs-properties': {
    element: 'property-editor-chartjs-properties'
  },
  'image-selector': {
    element: 'property-editor-image-selector',
    properties: {
      type: 'text'
    }
  },
  'options': {
    element: 'property-editor-options',
    properties: {
      options: 'options'
    }
  },
  'date': {
    element: 'property-editor-date',
    properties: {
      type: 'date'
    }
  }
};

export default function (state = STATE, action) {
  switch (action.type) {
    case 'MODULE-PLUGIN':

      let elements = action.elements;
      let newstate = Object.assign({}, state);

      for (let element in elements) {
        let editors = elements[element].editors;

        editors && editors.forEach(editor => {
          let {
            type,
            element,
            properties
          } = editor;

          console.log('editor', type, element, properties);
          newstate[type] = {
            element,
            properties
          };
        });
      }
      return newstate;

    default:
      return state
  }
};
