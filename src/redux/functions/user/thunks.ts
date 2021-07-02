import { Dispatch } from 'redux'
import { db } from 'src/firebase/firebase'
import { User } from 'src/redux/slices/auth/types'
import { Preference } from 'src/redux/slices/user/types'
import {
  preferenceModificationFailed,
  receivePreferences,
  receivePreferenceModification,
  requestPreferences,
  requestPreferenceModification,
  preferencesFetchFailed,
  requestPreferenceRemoval,
  receivePreferenceRemoval,
  preferenceRemovalFailed,
  requestAcccountActiveness,
  accountActivenessFetchFailed,
  receiveAccountActiveness,
  requestAccountActivenessModification,
  accountActivenessModificationFailed,
  receiveAccountActivenessModification,
} from 'src/redux/slices/user/user'

export const modifyProfile =
  (
    user: User,
    chosenArea: string,
    chosenFloorRange: number[],
    chosenTypes: string[]
  ) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestPreferenceModification())
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
      dispatch(receivePreferenceModification())
    } catch (error) {
      console.error(error)
      dispatch(preferenceModificationFailed())
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

export const fetchAccountActiveness =
  (user: User) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestAcccountActiveness())
    try {
      const userDocument = await db.collection('users').doc(user.uid).get()
      const userData = userDocument.data()
      if (userData) {
        dispatch(receiveAccountActiveness(userData.isActive))
      } else {
        dispatch(accountActivenessFetchFailed())
      }
    } catch (error) {
      console.error(error)
      dispatch(accountActivenessFetchFailed())
    }
  }

export const modifyAccountActiveness =
  (isActive: boolean, user: User) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestAccountActivenessModification())
    try {
      await db.collection('users').doc(user.uid).update({
        isActive,
      })
      dispatch(receiveAccountActivenessModification(isActive))
    } catch (error) {
      console.error(error)
      dispatch(accountActivenessModificationFailed())
    }
  }
