import { createSlice } from '@reduxjs/toolkit'

import { InitialState, User } from './types'

const initialState: InitialState = {
  user: {} as User,
  isAuthenticated: false,
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
  verificationFailed: false,
}

export const slice = createSlice({
  name: 'auth',
  initialState,
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

      state.isAuthenticated = true
      state.isVerifying = false

      state.isLoggingIn = false
      state.loginFailed = false
      state.loginSucceeded = true
    },
    loginError: (state): void => {
      state.isAuthenticated = false

      state.isLoggingIn = false
      state.loginFailed = true
      state.loginSucceeded = false
    },
    requestLogout: (state): void => {
      state.isLoggingOut = false
    },
    receiveLogout: (): InitialState => ({
      ...initialState,
      logOutSucceeded: true,
    }),
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
    },
  },
})

export const { requestSignUp, receiveSignUp, signUpError } = slice.actions
export const { requestLogin, receiveLogin, loginError } = slice.actions
export const { requestLogout, receiveLogout, logoutError } = slice.actions
export const { requestVerification, verificationFailed } = slice.actions

export default slice.reducer
