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
  removePreferenceError
} from './actions'

export const modifyProfile = async (
  user,
  chosenArea,
  chosenFloorRange
) => async dispatch => {
  dispatch(requestProfileModification())

  try {
    const batch = db.batch()
    const userDocRef = db.collection('users').doc(user.uid)
    const userFields = await getUserFields(userDocRef)
    const preferences = userFields.preferences

    const updatedPreferences = modifyUserPreferences(
      preferences,
      chosenArea,
      chosenFloorRange
    )

    batch.update(userDocRef, {
      preferences: updatedPreferences
    })
    await batch.commit()
    dispatch(receiveProfileModification())
  } catch (error) {
    console.error(error)
    dispatch(profileModificationError())
  }
}

export const fetchPreferences = userId => async dispatch => {
  dispatch(requestPreferences())
  try {
    const userDocRef = db.collection('users').doc(userId)
    const userFields = await getUserFields(userDocRef)
    const preferences = userFields.preferences
    dispatch(receivePreferences(preferences))
  } catch (error) {
    console.error(error)
    dispatch(receivePreferencesError())
  }
}

export const removePrefenceFromDb = (user, area) => async dispatch => {
  dispatch(requestPreferenceRemoval())
  try {
    const batch = db.batch()
    const userDocRef = db.collection('users').doc(user.uid)
    const userFields = await getUserFields(userDocRef)
    const preferences = userFields.preferences
    const updatedPreferences = removeUserPreference(preferences, area)
    batch.update(userDocRef, {
      preferences: updatedPreferences
    })
    await batch.commit()
    dispatch(receivePreferenceRemoval())
  } catch (error) {
    console.error(error)
    dispatch(removePreferenceError())
  }
}

const removeUserPreference = (preferences, area) => {
  let removeIndex
  for (let i = 0; i < preferences.length; i++) {
    const preference = preferences[i]
    if (preference.area === area) {
      removeIndex = i
    }
  }
  removeIndex !== undefined && preferences.splice(removeIndex, 1)
  return preferences
}

const modifyUserPreferences = (preferences, area, floorRange) => {
  let isNewPreference = true
  for (let i = 0; i < preferences.length; i++) {
    const preference = preferences[i]
    if (preference.area === area) {
      if (preference.floors !== floorRange) {
        preference.floors = floorRange
      }
      isNewPreference = false
    }
  }
  isNewPreference && preferences.push({ area: area, floors: floorRange })
  return preferences
}

const getUserFields = async userDocRef => {
  let fields
  try {
    fields = await userDocRef.get()
  } catch (error) {
    console.error(error)
  }
  return fields.data()
}
