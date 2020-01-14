import {
  MODIFY_PROFILE_REQUEST,
  MODIFY_PROFILE_SUCCESS,
  MODIFY_PROFILE_FAILURE,
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_FAILURE
} from './types'

export const requestProfileModification = () => {
  return {
    type: MODIFY_PROFILE_REQUEST
  }
}

export const receiveProfileModification = () => {
  return {
    type: MODIFY_PROFILE_SUCCESS
  }
}

export const profileModificationError = () => {
  return {
    type: MODIFY_PROFILE_FAILURE
  }
}

export const requestPreferences = () => {
  return {
    type: FETCH_PREFERENCES_REQUEST
  }
}

export const receivePreferences = preferences => {
  return {
    type: FETCH_PREFERENCES_SUCCESS,
    payload: preferences
  }
}

export const receivePreferencesError = preferences => {
  return {
    type: FETCH_PREFERENCES_FAILURE,
    payload: preferences
  }
}
