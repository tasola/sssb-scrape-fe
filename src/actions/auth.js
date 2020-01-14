import { myFirebase, db } from '../firebase/firebase'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const VERIFY_REQUEST = 'VERIFY_REQUEST'
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS'

const requestSignUp = () => {
  return {
    type: SIGN_UP_REQUEST
  }
}

const receiveSignUp = () => {
  return {
    type: SIGN_UP_SUCCESS
  }
}

const signUpError = () => {
  return {
    type: SIGN_UP_FAILURE
  }
}

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  }
}

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  }
}

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  }
}

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  }
}

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  }
}

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
