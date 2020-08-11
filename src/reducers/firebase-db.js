import {
  CHANGE_ACCOUNT_ACTIVITY_REQUEST,
  CHANGE_ACCOUNT_ACTIVITY_SUCCESS,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_DATA_SUCCESS,
  DELETE_ACCOUNT_DATA_FAILURE,
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_FAILURE,
  REMOVE_PREFERENCE_REQUEST,
  REMOVE_PREFERENCE_SUCCESS,
  REMOVE_PREFERENCE_FAILURE,
} from '../actions/firebase-db/types'

const INITIAL_STATE = {
  areas: [],
  isRequestingAccountActivity: false,
  isDeletingUserData: false,
  isUserDataDeleted: false,
  userDataDeletionError: false,
  preferenceFetchFailed: false,
  isFetchingPreferences: false,
  isRemovingPreference: false,
  preferenceRemovalFailed: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_ACCOUNT_ACTIVITY_REQUEST:
      return {
        ...state,
        isRequestingAccountActivity: true,
      }
    case CHANGE_ACCOUNT_ACTIVITY_SUCCESS:
      return {
        ...state,
        userIsActive: action.payload,
        isRequestingAccountActivity: false,
      }
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isDeletingUserData: true,
      }
    case DELETE_ACCOUNT_DATA_SUCCESS:
      return {
        ...state,
        isDeletingUserData: false,
        userDataDeletionError: false,
      }
    case DELETE_ACCOUNT_DATA_FAILURE:
      return {
        ...state,
        isDeletingUserData: false,
        userDataDeletionError: true,
      }
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
