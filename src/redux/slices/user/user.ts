import { createSlice } from '@reduxjs/toolkit'

import { InitialState } from './types'

const initialState: InitialState = {
  preferences: [],
  isModifyingProfile: false,
  profileModificationSucceeded: false,
  profileModificationFailed: false,
  isFetchingPreferences: false,
  preferencesFetchSucceeded: false,
  preferencesFetchFailed: false,
  isRemovingPreference: false,
  preferenceRemovalSucceeded: false,
  preferenceRemovalFailed: false
}

export const slice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    requestProfileModification: (state): void => {
      state.isModifyingProfile = true
    },
    receiveProfileModification: (state): void => {
      state.isModifyingProfile = false
      state.profileModificationSucceeded = true
      state.profileModificationFailed = false
    },
    profileModificationFailed: (state): void => {
      state.isModifyingProfile = false
      state.profileModificationSucceeded = false
      state.profileModificationFailed = true
    },
    requestPreferences: (state): void => {
      state.isFetchingPreferences = true
    },
    receivePreferences: (state, action): void => {
      state.preferences = action.payload
      state.isFetchingPreferences = false
      state.preferencesFetchSucceeded = true
      state.preferencesFetchFailed = false
    },
    preferencesFetchFailed: (state): void => {
      state.isFetchingPreferences = false
      state.preferencesFetchSucceeded = false
      state.preferencesFetchFailed = true
    },
    requestPreferenceRemoval: (state): void => {
      state.isRemovingPreference = true
    },
    receivePreferenceRemoval: (state): void => {
      state.isRemovingPreference = false
      state.preferenceRemovalSucceeded = true
      state.preferenceRemovalFailed = false
    },
    preferenceRemovalFailed: (state): void => {
      state.isRemovingPreference = false
      state.preferenceRemovalSucceeded = false
      state.preferenceRemovalFailed = true
    }
  }
})

export const { requestProfileModification, receiveProfileModification, profileModificationFailed } = slice.actions
export const { requestPreferences, receivePreferences, preferencesFetchFailed } = slice.actions
export const { requestPreferenceRemoval, receivePreferenceRemoval, preferenceRemovalFailed } = slice.actions

export default slice.reducer