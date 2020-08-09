import { myFirebase } from '../../firebase/firebase'
import { createUserDocument } from '../firebase-db/firebase-db'
import {
  requestSignUp,
  receiveSignUp,
  signUpError,
  requestLogin,
  receiveLogin,
  loginError,
  requestLogout,
  receiveLogout,
  logoutError,
  verifyRequest,
  verifySuccess,
} from './actions'

export const signUpUser = (email, password) => async (dispatch) => {
  dispatch(requestSignUp())
  try {
    const user = await myFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await createUserDocument(user.user)
    dispatch(receiveSignUp())
    sendVerification(user.user)
  } catch (error) {
    console.error(error)
    dispatch(signUpError())
  }
}

export const sendVerification = async (user) => {
  try {
    await user.sendEmailVerification()
  } catch (error) {}
}

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(requestLogin())
  try {
    const user = await myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    console.log(user)
    dispatch(receiveLogin(user))
    console.log(user)
  } catch (error) {
    console.error(error)
    dispatch(loginError())
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch(requestLogout())
  try {
    await myFirebase.auth().signOut()
    dispatch(receiveLogout())
  } catch (error) {
    console.error(error)
    dispatch(logoutError())
  }
}

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest())
  myFirebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user))
    }
    dispatch(verifySuccess())
  })
}
