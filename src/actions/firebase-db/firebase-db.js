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
    await db
      .collection('users')
      .doc(user.uid)
      .set({ email: user.email, isActive: true })
  } catch (error) {
    console.error(error)
  }
}

export const modifyProfile = async (
  user,
  chosenArea,
  chosenFloorRange,
  chosenTypes
) => async (dispatch) => {
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

export const updateAccountActivity = async (user, isActive) => async (
  dispatch
) => {
  //dispatch
  try {
    const dbUser = db.collection('users').doc(user.uid)
    await dbUser.update({ isActive: isActive })
    //dispatch(receiveAccountActivity())
  } catch (error) {
    console.error(error)
    //dispatch
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
        querySnapshot.forEach((documentSnapshot) => {
          if (!documentSnapshot._document.proto) return
          const {
            area,
            floors,
            types,
          } = documentSnapshot._document.proto.fields
          const savedTypes = getSavedTypes(types)
          preferences.push({
            area: area.stringValue,
            floors: floors.arrayValue.values.map((i) => i.integerValue),
            types: savedTypes.map((t) => t.stringValue),
          })
        })
      })
    dispatch(receivePreferences(preferences))
  } catch (error) {
    console.error(error)
    dispatch(receivePreferencesError())
  }
}

const getSavedTypes = (types) => {
  const savedTypes =
    types && types.arrayValue && types.arrayValue.values
      ? types.arrayValue.values
      : []
  return savedTypes
}

export const removePrefenceFromDb = (user, area) => async (dispatch) => {
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
