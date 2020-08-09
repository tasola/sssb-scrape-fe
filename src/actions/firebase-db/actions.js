import {
  MODIFY_PROFILE_REQUEST,
  MODIFY_PROFILE_SUCCESS,
  MODIFY_PROFILE_FAILURE,
  CHANGE_ACCOUNT_ACTIVITY_REQUEST,
  CHANGE_ACCOUNT_ACTIVITY_SUCCESS,
  FETCH_PREFERENCES_REQUEST,
  FETCH_PREFERENCES_SUCCESS,
  FETCH_PREFERENCES_FAILURE,
  REMOVE_PREFERENCE_REQUEST,
  REMOVE_PREFERENCE_SUCCESS,
  REMOVE_PREFERENCE_FAILURE,
} from './types'

export const requestProfileModification = () => {
  return {
    type: MODIFY_PROFILE_REQUEST,
  }
}

export const receiveProfileModification = () => {
  return {
    type: MODIFY_PROFILE_SUCCESS,
  }
}

export const profileModificationError = () => {
  return {
    type: MODIFY_PROFILE_FAILURE,
  }
}

export const requestAccountActivity = () => {
  return {
    type: CHANGE_ACCOUNT_ACTIVITY_REQUEST,
  }
}

export const receiveAccountActivity = (isActive) => {
  return {
    type: CHANGE_ACCOUNT_ACTIVITY_SUCCESS,
    payload: isActive,
  }
}

export const requestPreferences = () => {
  return {
    type: FETCH_PREFERENCES_REQUEST,
  }
}

export const receivePreferences = (preferences) => {
  return {
    type: FETCH_PREFERENCES_SUCCESS,
    payload: preferences,
  }
}

export const receivePreferencesError = (preferences) => {
  return {
    type: FETCH_PREFERENCES_FAILURE,
    payload: preferences,
  }
}

export const requestPreferenceRemoval = () => {
  return {
    type: REMOVE_PREFERENCE_REQUEST,
  }
}

export const receivePreferenceRemoval = () => {
  return {
    type: REMOVE_PREFERENCE_SUCCESS,
  }
}

export const removePreferenceError = () => {
  return {
    type: REMOVE_PREFERENCE_FAILURE,
  }
}
