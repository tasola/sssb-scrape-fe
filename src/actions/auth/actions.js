import {
  SIGN_UP_REQUEST,
  SIGN_UP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS
} from './types'

export const requestSignUp = () => {
  return {
    type: SIGN_UP_REQUEST
  }
}

export const receiveSignUp = () => {
  return {
    type: SIGN_UP_REQUEST
  }
}

export const signUpError = () => {
  return {
    type: SIGN_UP_FAILURE
  }
}

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  }
}

export const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  }
}

export const loginError = () => {
  return {
    type: LOGIN_FAILURE
  }
}

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

export const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  }
}

export const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  }
}

export const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  }
}
