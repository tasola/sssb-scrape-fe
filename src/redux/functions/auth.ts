import { myFirebase } from 'src/firebase/firebase'
import { createUserDocument } from 'src/redux/functions/user'
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
  verificationFailed
} from 'src/redux/slices/auth/auth'

export const signUpUser = (email: string, password: string) =>
  async (dispatch): Promise<void> => {
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

export const sendVerification = async (user): Promise<void> => {
  try {
    await user.sendEmailVerification()
  } catch (error) {
    console.error('Failed to send verification email')
  }
}

export const loginUser = (email, password) => async (dispatch): Promise<void> => {
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

export const logoutUser = () => async (dispatch): Promise<void> => {
  dispatch(requestLogout())
  try {
    await myFirebase.auth().signOut()
    dispatch(receiveLogout())
  } catch (error) {
    console.error(error)
    dispatch(logoutError())
  }
}

export const verifyAuth = () => (dispatch): void => {
  dispatch(requestVerification())
  myFirebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user))
    }
    dispatch(verificationFailed())
  })
}


// HELPERS

// The user attribute of Firebase's signInUserWithEmailAndPassword is a class instance, which is
// not fully serializable. Non-serializable should not be put in actions:
// https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions
const extractUserClassToObject = (userClass) => {
  const {
    uid,
    displayName,
    email,
    refreshToken,
    emailVerified,
    isAnonymous,
    metadata,
  } = userClass

  const {
    creationTime,
    lastSignInTime
  } = metadata

  return {
    uid,
    displayName,
    email,
    refreshToken,
    emailVerified,
    isAnonymous,
    metadata: {
      creationTime,
      lastSignInTime
    }
  }
}