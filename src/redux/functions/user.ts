import { db } from 'src/firebase/firebase'
import {
  profileModificationFailed,
  receivePreferences,
  receiveProfileModification,
  requestPreferences,
  requestProfileModification,
  preferencesFetchFailed,
  requestPreferenceRemoval,
  receivePreferenceRemoval,
  preferenceRemovalFailed
} from 'src/redux/slices/user/user'

import { Preference } from '../slices/user/types'

export const createUserDocument = async (user): Promise<void> => {
  try {
    await db.collection('users').doc(user.uid).set({ email: user.email })
  } catch (error) {
    console.error(error)
  }
}

export const modifyProfile =
  (user, chosenArea, chosenFloorRange, chosenTypes) =>
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

export const fetchPreferences =
  (userId: string) =>
    async (dispatch): Promise<void> => {
      dispatch(requestPreferences())
      try {
        const preferences: Preference[] = []
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