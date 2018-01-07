// const STATE = Array(10).fill({}).map((o, seq) => {
//   return {
//     name: 'group ' + seq,
//     description: 'Group .... Click to edit.'
//   }
// });

import '@hatiolab/things-scene';

const STATE = Object.keys(META.components).map((name) => {
  let component = META.components[name];

  // System.import('../../' + component.path);

  return {
    name: name,
    description: META.components[name].path
  }
});

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
