const STATE = {
  'legend': 'property-editor-legend',
  'number': 'property-editor-number',
  'angle': 'property-editor-angle',
  'string': 'property-editor-string',
  'textarea': 'property-editor-textarea',
  'checkbox': 'property-editor-checkbox',
  'select': 'property-editor-select',
  'color': 'property-editor-color',
  'solid-color-stops': 'property-editor-solid-colorstops',
  'gradient-color-stops': 'property-editor-gradient-colorstops',
  'multiple-color': 'property-editor-multiple-color',
  'editor-table': 'property-editor-table',
  'image-selector': 'property-editor-image-selector',
  'options': 'property-editor-options',
  'date': 'property-editor-date'
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
            element
          } = editor;

          newstate[type] = element;
        });
      }
      return newstate;

    default:
      return state;
  }
};
