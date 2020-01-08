import { FETCH_AREAS } from '../actions/contentful'

const INITIAL_STATE = { areas: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_AREAS:
      return { ...state, areas: action.payload.data.items }
    default:
      return state
  }
}
