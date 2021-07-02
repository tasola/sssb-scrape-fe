import { createSlice } from '@reduxjs/toolkit'

import { InitialState } from './types'

const initialState: InitialState = {
  preferences: [],
  isActive: false,
  isModifyingPreference: false,
  preferenceModificationSucceeded: false,
  preferenceModificationFailed: false,
  isFetchingPreferences: false,
  preferencesFetchSucceeded: false,
  preferencesFetchFailed: false,
  isRemovingPreference: false,
  preferenceRemovalSucceeded: false,
  preferenceRemovalFailed: false,
  isFetchingAccountActiveness: false,
  accountActivenessFetchSucceeded: false,
  accountActivenessFetchFailed: false,
  isModifyingAccountActiveness: false,
  accountActivenessModifcationSucceeded: false,
  accountActivenessModificationFailed: false,
}

export const slice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    requestPreferenceModification: (state): void => {
      state.isModifyingPreference = true
      state.preferenceModificationSucceeded = false
      state.preferenceModificationFailed = false
    },
    receivePreferenceModification: (state): void => {
      state.isModifyingPreference = false
      state.preferenceModificationSucceeded = true
      state.preferenceModificationFailed = false
    },
    preferenceModificationFailed: (state): void => {
      state.isModifyingPreference = false
      state.preferenceModificationSucceeded = false
      state.preferenceModificationFailed = true
    },
    requestPreferences: (state): void => {
      state.isFetchingPreferences = true
      state.preferencesFetchSucceeded = false
      state.preferencesFetchFailed = false
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
      state.preferenceRemovalSucceeded = false
      state.preferenceRemovalFailed = false
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
    },
    requestAcccountActiveness: (state): void => {
      state.isFetchingAccountActiveness = true
      state.accountActivenessFetchSucceeded = false
      state.accountActivenessFetchFailed = false
    },
    receiveAccountActiveness: (state, action): void => {
      state.isActive = action.payload

      state.isFetchingAccountActiveness = false
      state.accountActivenessFetchSucceeded = true
      state.accountActivenessFetchFailed = false
    },
    accountActivenessFetchFailed: (state): void => {
      state.isFetchingAccountActiveness = false
      state.accountActivenessFetchSucceeded = false
      state.accountActivenessFetchFailed = true
    },
    requestAccountActivenessModification: (state): void => {
      state.isModifyingAccountActiveness = true
      state.accountActivenessModifcationSucceeded = false
      state.accountActivenessModificationFailed = false
    },
    receiveAccountActivenessModification: (state, action): void => {
      state.isActive = action.payload

      state.isModifyingAccountActiveness = false
      state.accountActivenessModifcationSucceeded = true
      state.accountActivenessModificationFailed = false
    },
    accountActivenessModificationFailed: (state): void => {
      state.isModifyingAccountActiveness = false
      state.accountActivenessModifcationSucceeded = false
      state.accountActivenessModificationFailed = true
    },
  },
})

export const {
  requestPreferenceModification,
  receivePreferenceModification,
  preferenceModificationFailed,
} = slice.actions
export const {
  requestPreferences,
  receivePreferences,
  preferencesFetchFailed,
} = slice.actions
export const {
  requestPreferenceRemoval,
  receivePreferenceRemoval,
  preferenceRemovalFailed,
} = slice.actions
export const {
  requestAcccountActiveness,
  receiveAccountActiveness,
  accountActivenessFetchFailed,
} = slice.actions
export const {
  requestAccountActivenessModification,
  receiveAccountActivenessModification,
  accountActivenessModificationFailed,
} = slice.actions

export default slice.reducer
