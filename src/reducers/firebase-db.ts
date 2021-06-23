import { Preference } from 'src/components/ChosenPreferenceCard/types'

import {
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_FAILURE,
  REMOVE_PREFERENCE_REQUEST,
  REMOVE_PREFERENCE_SUCCESS,
  REMOVE_PREFERENCE_FAILURE,
} from '../actions/firebase-db/types'

const INITIAL_STATE = {
  areas: [],
  preferences: [],
  preferenceFetchFailed: false,
  isFetchingPreferences: false,
  isRemovingPreference: false,
  preferenceRemovalFailed: false,
}

type State = {
  areas: string[];
  preferences: Preference[];
  preferenceFetchFailed: boolean;
  isFetchingPreferences: boolean;
  isRemovingPreference: boolean;
  preferenceRemovalFailed: boolean;
}

export default (state = INITIAL_STATE, action): State => {
  switch (action.type) {
    case FETCH_PREFERENCES_REQUEST:
      return {
        ...state,
        preferenceFetchFailed: false,
        isFetchingPreferences: true,
      }
    case FETCH_PREFERENCES_SUCCESS:
      return {
        ...state,
        preferences: action.payload,
        preferenceFetchFailed: false,
        isFetchingPreferences: false,
      }
    case FETCH_PREFERENCES_FAILURE:
      return {
        ...state,
        preferenceFetchFailed: true,
        isFetchingPreferences: false,
      }
    case REMOVE_PREFERENCE_REQUEST:
      return {
        ...state,
        isRemovingPreference: true,
      }
    case REMOVE_PREFERENCE_SUCCESS:
      return {
        ...state,
        isRemovingPreference: false,
      }
    case REMOVE_PREFERENCE_FAILURE:
      return {
        ...state,
        isRemovingPreference: false,
        preferenceRemovalFailed: true,
      }
    default:
      return state
  }
}