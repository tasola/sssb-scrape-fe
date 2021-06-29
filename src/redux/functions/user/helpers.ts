import firebase from 'firebase'
import { db } from 'src/firebase/firebase'

export const createUserDocument = async (user: firebase.User): Promise<void> => {
  try {
    await db.collection('users').doc(user.uid).set({ email: user.email })
  } catch (error) {
    console.error(error)
  }
}