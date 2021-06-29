import { Dispatch } from 'redux'
import { myFirebase } from 'src/firebase/firebase'
import { createUserDocument } from 'src/redux/functions/user/helpers'
import {
  loginError,
  logoutError,
  receiveLogin,
  receiveLogout,
  receiveSignUp,
  requestLogin,
  requestLogout,
  requestSignUp,
  signUpError,
  requestVerification,
  verificationFailed,
} from 'src/redux/slices/auth/auth'
import { persistor } from 'src/redux/store/store'

import { extractUserClassToObject, sendVerification } from './helpers'

export const signUpUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestSignUp())
    try {
      const userCredential = await myFirebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      if (userCredential.user) {
        await createUserDocument(userCredential.user)
        dispatch(receiveSignUp())
        sendVerification(userCredential.user)
      } else {
        dispatch(signUpError())
      }
    } catch (error) {
      console.error(error)
      dispatch(signUpError())
    }
  }

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestLogin())
    try {
      const userCredentials = await myFirebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      if (userCredentials.user) {
        const user = extractUserClassToObject(userCredentials.user)
        dispatch(receiveLogin(user))
      } else {
        dispatch(loginError())
      }
    } catch (error) {
      console.error(error)
      dispatch(loginError())
    }
  }

export const logoutUser =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestLogout())
    try {
      await myFirebase.auth().signOut()
      dispatch(receiveLogout())
      persistor.purge()
    } catch (error) {
      console.error(error)
      dispatch(logoutError())
    }
  }

export const verifyAuth =
  () =>
  (dispatch: Dispatch): void => {
    dispatch(requestVerification())
    myFirebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        const serializableUser = extractUserClassToObject(user)
        dispatch(receiveLogin(serializableUser))
      } else {
        dispatch(verificationFailed())
      }
    })
  }
