export default (reducers, initialState) => (
  state = initialState,
  action = {}
) => {
  let reducer = reducers[action.type]
  return reducer ? reducer(state, action.payload) : state
}

export const createAction = (type, payload) => ({ type, ...payload })
