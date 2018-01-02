const STATE = Array(100).fill({}).map((o, seq) => {
  return {
    name: 'scene ' + seq,
    description: 'Scene .... Click to edit.'
  }
});

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
