import { FETCH_PREFERENCES_REQUEST } from '../actions/firebase-db'

const INITIAL_STATE = { areas: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PREFERENCES_REQUEST:
      return { ...state, preferences: action.payload.data.items }
    default:
      return state
  }
}
