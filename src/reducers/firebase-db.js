import {
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_FAILURE
} from '../actions/firebase-db/types'

const INITIAL_STATE = { areas: [] }

export default (state = INITIAL_STATE, action) => {
  const preferenceFetchFailed = false
  switch (action.type) {
    case FETCH_PREFERENCES_REQUEST:
      return {
        ...state,
        preferenceFetchFailed: preferenceFetchFailed,
        isFetchingPreferences: true
      }
    case FETCH_PREFERENCES_SUCCESS:
      return {
        ...state,
        preferences: action.payload,
        preferenceFetchFailed: preferenceFetchFailed,
        isFetchingPreferences: false
      }
    case FETCH_PREFERENCES_FAILURE:
      return {
        ...state,
        preferenceFetchFailed: true,
        isFetchingPreferences: false
      }
    default:
      return state
  }
}
