export type InitialState = {
  user: User
  isAuthenticated: boolean
  isSigningUp: boolean
  signUpSucceeded: boolean
  signUpFailed: boolean
  isLoggingIn: boolean
  loginFailed: boolean
  loginSucceeded: boolean
  loginError: boolean
  isLoggingOut: boolean
  logOutFailed: boolean
  logOutSucceeded: boolean
  isVerifying: boolean
  verificationFailed: boolean
}

export type User = {
  uid: string
  displayName: string | null
  email: string | null
  refreshToken: string
  emailVerified: boolean
  isAnonymous: boolean
  metadata: {
    creationTime?: string
    lastSignInTime?: string
  }
}
