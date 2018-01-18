const STATE = {
  'app-version': process.env['APP-VERSION'],
  'node-env': process.env['NODE-ENV']
}

export default function (state = STATE, action) {
  switch (action.type) {
    default:
      return state
  }
}
