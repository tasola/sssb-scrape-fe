import { db } from '../../firebase/firebase'
import {
  requestProfileModification,
  receiveProfileModification,
  profileModificationError,
  requestPreferences,
  receivePreferences,
  receivePreferencesError,
  requestPreferenceRemoval,
  receivePreferenceRemoval,
  removePreferenceError,
} from './actions'

export const createUserDocument = async (user) => {
  try {
    await db.collection('users').doc(user.uid).set({ email: user.email })
  } catch (error) {
    console.error(error)
  }
}

export const modifyProfile =
  async (user, chosenArea, chosenFloorRange, chosenTypes) =>
  async (dispatch) => {
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
      dispatch(profileModificationError())
    }
  }

export const fetchPreferences = (userId) => async (dispatch) => {
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
    dispatch(receivePreferencesError())
  }
}

export const removePreferenceFromDb = (user, area) => async (dispatch) => {
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
    dispatch(removePreferenceError())
  }
}
