import { createSlice } from '@reduxjs/toolkit'
import { db } from 'src/firebase/firebase'

export const slice = createSlice({
  name: 'firebase',
  initialState: {
    preferences: [],
    isModifyingProfile: false,
    profileModificationSucceeded: false,
    profileModificationFailed: false,
    isFetchingPreferences: false,
    preferenceFetchSucceeded: false,
    preferenceFetchFailed: false,
    isRemovingPreference: false,
    preferenceRemovalSucceeded: false,
    preferenceRemovalFailed: false
  },
  reducers: {
    requestProfileModification: (state): void => {
      state.isModifyingProfile = true
    },
    receiveProfileModification: (state): void => {
      state.isModifyingProfile = false,
      state.profileModificationSucceeded = true,
      state.profileModificationFailed = false
    },
    profileModificationFailed: (state): void => {
      state.isModifyingProfile = false,
      state.profileModificationSucceeded = false,
      state.profileModificationFailed = true
    },
    requestPreferences: (state): void => {
      state.isFetchingPreferences = true
    },
    receivePreferences: (state, action): void => {
      state.preferences = action.payload
      state.isFetchingPreferences = false
      state.preferenceFetchSucceeded = true
      state.preferenceFetchFailed = false
    },
    preferencesFetchFailed: (state): void => {
      state.isFetchingPreferences = false,
      state.preferenceFetchSucceeded = false,
      state.preferenceFetchFailed = true
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

export const createUserDocument = async (user): Promise<void> => {
  try {
    await db.collection('users').doc(user.uid).set({ email: user.email })
  } catch (error) {
    console.error(error)
  }
}

export const modifyProfile =
  async (user, chosenArea, chosenFloorRange, chosenTypes) =>
  async (dispatch): Promise<void> => {
    dispatch(requestProfileModification())
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('preferences')
        .doc(chosenArea.toLowerCase())
        .set({
          email: user.email,
          area: chosenArea.toLowerCase(),
          floors: chosenFloorRange,
          minFloor: chosenFloorRange[0],
          types: chosenTypes,
        })
      dispatch(receiveProfileModification())
    } catch (error) {
      console.error(error)
      dispatch(profileModificationFailed())
    }
  }

export const fetchPreferences = (userId) => async (dispatch): Promise<void> => {
  dispatch(requestPreferences())
  try {
    const preferences = []
    await db
      .collection('users')
      .doc(userId)
      .collection('preferences')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          const { area, floors, types } = document.data()
          preferences.push({
            area,
            floors,
            types,
          })
        })
      })
    dispatch(receivePreferences(preferences))
  } catch (error) {
    console.error(error)
    dispatch(preferencesFetchFailed())
  }
}

export const removePreferenceFromDb = (user, area) => async (dispatch): Promise<void> => {
  dispatch(requestPreferenceRemoval())
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .collection('preferences')
      .doc(area.toLowerCase())
      .delete()
    dispatch(receivePreferenceRemoval())
  } catch (error) {
    console.error(error)
    dispatch(preferenceRemovalFailed())
  }
}

export default slice.reducer