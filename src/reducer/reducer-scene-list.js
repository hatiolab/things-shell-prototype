// const STATE = Array(100).fill({}).map((o, seq) => {
//   return {
//     name: 'scene ' + seq,
//     description: 'Scene .... Click to edit.'
//   }
// });

const STATE = Object.keys(META.samples).map((sample) => {
  return {
    name: sample,
    description: META.samples[sample]
  }
});

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
