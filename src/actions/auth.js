import { myFirebase, db } from '../firebase/firebase'

export const MODIFY_PROFILE_REQUEST = 'MODIFY_PROFILE_REQUEST'
export const MODIFY_PROFILE_SUCCESS = 'MODIFY_PROFILE_SUCCESS'
export const MODIFY_PROFILE_FAILURE = 'MODIFY_PROFILE_FAILURE'

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

const requestProfileModification = () => {
  return {
    type: MODIFY_PROFILE_REQUEST
  }
}

const receiveProfileModification = () => {
  return {
    type: MODIFY_PROFILE_SUCCESS
  }
}

const profileModificationError = () => {
  return {
    type: MODIFY_PROFILE_FAILURE
  }
}

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

export const signUpUser = (email, password) => async dispatch => {
  dispatch(requestSignUp())
  try {
    await myFirebase.auth().createUserWithEmailAndPassword(email, password)
    dispatch(receiveSignUp())
  } catch (error) {
    console.error(error)
    dispatch(signUpError())
  }
}

export const modifyProfile = (user, chosenArea) => async dispatch => {
  console.log(user)
  console.log(chosenArea)
  dispatch(requestProfileModification())
  try {
    await db
      .collection('user')
      .doc(user.uid)
      .set({ chosenArea: chosenArea })
    dispatch(receiveProfileModification())
  } catch (error) {
    console.error(error)
    dispatch(profileModificationError())
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
