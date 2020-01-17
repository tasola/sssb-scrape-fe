import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  SEND_VERIFICATION_REQUEST,
  SEND_VERIFICATION_SUCCESS,
  SEND_VERIFICATION_FAILURE
} from '../actions/auth/types'

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    isVerificationMailSent: false,
    isVerificationMailSending: false,
    user: {}
  },
  action
) => {
  console.log(action.type)
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      }
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      }
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      }
    case SEND_VERIFICATION_REQUEST:
      return {
        ...state,
        isVerificationMailSent: false,
        isVerificationMailSending: true
      }
    case SEND_VERIFICATION_SUCCESS:
      return {
        ...state,
        isVerificationMailSent: true,
        isVerificationMailSending: false
      }
    case SEND_VERIFICATION_FAILURE:
      return {
        ...state,
        isVerificationMailSent: false,
        isVerificationMailSending: false
      }
    default:
      return state
  }
}
