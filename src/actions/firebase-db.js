import { db } from '../firebase/firebase'

export const FETCH_PREFERENCES_REQUEST = 'FETCH_PREFERENCES_REQUEST'

// const requestPreferences = () => {
//   return {
//     type: FETCH_PREFERENCES_REQUEST
//   }
// }

// // CHANGE THE FOLLOWING:
// export const fetchPreferences = user => async dispatch => {
//   console.log(user)
//   console.log(chosenArea)
//   dispatch(requestPreferences())
//   try {
//     await db
//       .collection('user')
//       .doc(user.uid)
//       .collection(chosenArea)
//       .doc('floors')
//       .set({ chosenFloorRange: chosenFloorRange })
//   } catch (error) {
//     console.error(error)
//   }
// }

// https://medium.com/firebase-tips-tricks/how-to-list-all-subcollections-of-a-cloud-firestore-document-17f2bb80a166
export const fetchPreferences = async userId => {
  let preferences = 'Not found'
  try {
    const doc = await db
      .collection('user')
      .doc(userId)
      .getCollections()
    if (!doc.exists) {
      console.log(`No documents found for ${userId}`)
    } else {
      console.log(doc.data())
      preferences = doc.data()
    }
  } catch (error) {
    console.error(error)
  }
  return {
    type: FETCH_PREFERENCES_REQUEST,
    payload: preferences
  }
}
