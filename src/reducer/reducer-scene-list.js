// const STATE = Object.keys(META.samples).map((sample) => {
//   return {
//     name: sample,
//     description: META.samples[sample]
//   }
// });

const STATE = {}

export default function (state = STATE, action) {
  switch (action.type) {
    case 'SCENE-LIST':
      return action.list;

    case 'CLEAR-SCENE-LIST':
      return [];

    default:
      return state
  }
}
