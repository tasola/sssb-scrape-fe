import { FETCH_APARTMENT_META_DATA } from '../actions/contentful'

const INITIAL_STATE = { areas: [] }

type State = {
  areas: string[];
}

export default (state = INITIAL_STATE, action): State => {
  switch (action.type) {
    case FETCH_APARTMENT_META_DATA:
      return { ...state, areas: action.payload.items }
    default:
      return state
  }
}
