import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from '../actions/auth/types'

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    isDeletingUser: false,
    userDeletionError: false,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
      }
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      }
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
      }
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      }
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      }
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        isDeletingUser: true,
      }
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isDeletingUser: false,
        userDeletionError: false,
      }
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        isDeletingUser: false,
        userDeletionError: true,
      }
    default:
      return state
  }
}
