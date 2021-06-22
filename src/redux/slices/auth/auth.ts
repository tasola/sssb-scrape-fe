import { createSlice } from '@reduxjs/toolkit'
import { myFirebase } from 'src/firebase/firebase'

import { createUserDocument } from '../user/user'

export const slice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isSigningUp: false,
    signUpSucceeded: false,
    signUpFailed: false,
    isLoggingIn: false,
    loginFailed: false,
    loginSucceeded: false,
    isLoggingOut: false,
    logOutFailed: false,
    logOutSucceeded: false,
    isVerifying: false,
    verificationFailed: false
  },
  reducers: {
    requestSignUp: (state): void => {
      state.isSigningUp = true
    },
    receiveSignUp: (state): void => {
      state.isSigningUp = false
      state.signUpFailed = false
      state.signUpSucceeded = true
    },
    signUpError: (state): void => {
      state.isSigningUp = false
      state.signUpFailed = true
      state.signUpSucceeded = false
    },
    requestLogin: (state): void => {
      state.isLoggingIn = true
    },
    receiveLogin: (state, action): void => {
      state.user = action.payload
      state.isLoggingIn = false
      state.loginFailed = false
      state.loginSucceeded = true
    },
    loginError: (state): void => {
      state.isLoggingIn = false
      state.loginFailed = true
      state.loginSucceeded = false
    },
    requestLogout: (state): void => {
      state.isLoggingOut = false
    },
    receiveLogout: (state): void => {
      state.isLoggingOut = false
      state.logOutFailed = false
      state.logOutSucceeded = true
    },
    logoutError: (state): void => {
      state.isLoggingOut = false
      state.logOutFailed = true
      state.logOutSucceeded = false
    },
    requestVerification: (state): void => {
      state.isVerifying = true
    },
    verificationFailed: (state): void => {
      state.isVerifying = false
      state.verificationFailed = true
    }
  }
})

export const { requestSignUp, receiveSignUp, signUpError } = slice.actions
export const { requestLogin, receiveLogin, loginError } = slice.actions
export const { requestLogout, receiveLogout, logoutError } = slice.actions
export const { requestVerification, verificationFailed } = slice.actions

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
    const user = await myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
    dispatch(receiveLogin(user))
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
  dispatch(requestVerification())
  myFirebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user))
    }
    dispatch(verificationFailed())
  })
}

export default slice.reducer