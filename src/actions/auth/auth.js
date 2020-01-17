import { myFirebase, db } from '../../firebase/firebase'
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
  requestSendVerification,
  receieveSendVerification,
  sendVerificationError
} from './actions'

const createUserCollection = async user => {
  console.log('Create user collection')
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .set({ preferences: [] })
  } catch (error) {
    console.error(error)
  }
}

export const signUpUser = (email, password) => async dispatch => {
  dispatch(requestSignUp())
  try {
    console.log('creating user...')
    const user = await myFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    await createUserCollection(user.user)
    dispatch(receiveSignUp())
    dispatch(sendVerification(user.user))
  } catch (error) {
    console.error(error)
    dispatch(signUpError())
  }
}

export const sendVerification = user => async dispatch => {
  console.log('sending verification...')
  dispatch(requestSendVerification())
  try {
    await user.sendEmailVerification()
    console.log('email successfully sent!')
    dispatch(receieveSendVerification())
  } catch (error) {
    console.error(error)
    dispatch(sendVerificationError())
  }
}

export const loginUser = (email, password) => async dispatch => {
  dispatch(requestLogin())
  try {
    const user = await myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    dispatch(receiveLogin(user))
  } catch (error) {
    console.error(error)
    dispatch(loginError())
  }
}

export const logoutUser = () => async dispatch => {
  console.log('logout is called')
  dispatch(requestLogout())
  try {
    console.log('Logging out....')
    await myFirebase.auth().signOut()
    dispatch(receiveLogout())
  } catch (error) {
    console.error(error)
    dispatch(logoutError())
  }
}

export const verifyAuth = () => dispatch => {
  console.log('Verifying!')
  dispatch(verifyRequest())
  myFirebase.auth().onAuthStateChanged(user => {
    console.log('i onauthstatechanged')
    if (user !== null) {
      console.log(user)
      dispatch(receiveLogin(user))
    }
    dispatch(verifySuccess())
  })
}
