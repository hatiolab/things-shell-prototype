const STATE = Array(10).fill({}).map((o, seq) => {
  return {
    name: 'group ' + seq,
    description: 'Group .... Click to edit.'
  }
});

export default function(state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
