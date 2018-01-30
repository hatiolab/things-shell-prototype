const STATE = {
  fonts: [{
    name: 'AAA'
  }, {
    name: 'BBB'
  }]
};

export default function (state = STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
