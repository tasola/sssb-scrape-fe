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

// export const TEST_SCHEME = () => async dispatch =>{

//   dispatch(requestProfileModification())
// }

export const TEST_SCHEME = id => async dispatch => {
  const prefs = []
  const userDocRef = await db
    .collection('users')
    .doc('47yX9gqLeoUekXoFd8Eyihw5e6D3')
    .collection('preferences')
    .limit(10)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log(`Found document at ${documentSnapshot.ref.path}`)
        console.log(documentSnapshot)
        prefs.push({
          area: documentSnapshot._document.proto.fields.title,
          floors: documentSnapshot._document.proto.fields.floors
        })
      })
    })

  // const s = await getUserFields(userDocRef)
  // const userFields = await getUserFields(userDocRef)
  console.log(userDocRef)
  console.log(prefs)

  // const rov = await db
  //   .collection('users')
  //   .doc('47yX9gqLeoUekXoFd8Eyihw5e6D3')
  //   .collection('preferences')
  //   .where('title', '==', 'hugin')
  //   .get()
  //   .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, ' => ', doc.data())
  //     })
  //   })

  const rov2 = await db
    .collectionGroup('preferences')
    .where('title', '==', 'hugin')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc)
        console.log(doc.ref.path)
        console.log(doc.id, ' => ', doc.data())
      })
    })

  db.collection('users')
    .doc('testid')
    .set({ preferences: '' })

  await modifyProfile({ uid: 'testid' }, 'hugin', [0, 1, 5])

  dispatch(requestProfileModification())
}

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
