import { FETCH_APARTMENT_META_DATA } from '../actions/contentful'

const INITIAL_STATE = { areas: [] }

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_APARTMENT_META_DATA:
      return { ...state, areas: action.payload.data.items }
    default:
      return state
  }
}
