import { db } from '../../firebase/firebase'
import {
  requestProfileModification,
  receiveProfileModification,
  profileModificationError,
  requestPreferences,
  receivePreferences,
  receivePreferencesError
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
      chosenFloorRange,
      userDocRef
    )

    await batch.update(userDocRef, {
      preferences: updatedPreferences
    })
    await batch.commit()
    dispatch(receiveProfileModification())
  } catch (error) {
    console.error(error)
    dispatch(profileModificationError())
  }
}

const modifyUserPreferences = (preferences, area, floorRange, docRef) => {
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

export const fetchPreferences = userId => async dispatch => {
  dispatch(requestPreferences())
  console.log(userId)
  try {
    const userDocRef = db.collection('users').doc(userId)
    const userFields = await getUserFields(userDocRef)
    const preferences = userFields.preferences
    console.log(preferences)
    dispatch(receivePreferences(preferences))
  } catch (error) {
    console.error(error)
    dispatch(receivePreferencesError())
  }
}
