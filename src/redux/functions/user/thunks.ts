import { Dispatch } from 'redux'
import { db } from 'src/firebase/firebase'
import { User } from 'src/redux/slices/auth/types'
import { Preference } from 'src/redux/slices/user/types'
import {
  profileModificationFailed,
  receivePreferences,
  receiveProfileModification,
  requestPreferences,
  requestProfileModification,
  preferencesFetchFailed,
  requestPreferenceRemoval,
  receivePreferenceRemoval,
  preferenceRemovalFailed,
} from 'src/redux/slices/user/user'

export const modifyProfile =
  (
    user: User,
    chosenArea: string,
    chosenFloorRange: number[],
    chosenTypes: string[]
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
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
  async (dispatch: Dispatch): Promise<void> => {
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

export const removePreferenceFromDb =
  (user: User, area: string) =>
  async (dispatch: Dispatch): Promise<void> => {
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
