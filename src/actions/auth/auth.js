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
  verifySuccess
} from './actions'

const createUserCollection = async user => {
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
    const user = await myFirebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
    console.log(user)
    createUserCollection(user.user)
    dispatch(receiveSignUp())
  } catch (error) {
    console.error(error)
    dispatch(signUpError())
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
  dispatch(requestLogout())
  try {
    await myFirebase.auth().signOut()
    dispatch(receiveLogout())
  } catch (error) {
    console.error(error)
    dispatch(logoutError())
  }
}

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest())
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user))
    }
    dispatch(verifySuccess())
  })
}
