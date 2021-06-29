import { User } from 'src/redux/slices/auth/types'

export const sendVerification = async (user: firebase.User): Promise<void> => {
  try {
    await user.sendEmailVerification()
  } catch (error) {
    console.error('Failed to send verification email')
  }
}

// The user attribute of Firebase's signInUserWithEmailAndPassword is a class instance, which is
// not fully serializable. Non-serializable should not be put in actions:
// https://redux.js.org/style-guide/style-guide#do-not-put-non-serializable-values-in-state-or-actions
export const extractUserClassToObject = (userClass: firebase.User): User => {
  const {
    uid,
    displayName,
    email,
    refreshToken,
    emailVerified,
    isAnonymous,
    metadata,
  } = userClass

  const { creationTime, lastSignInTime } = metadata

  return {
    uid,
    displayName,
    email,
    refreshToken,
    emailVerified,
    isAnonymous,
    metadata: {
      creationTime,
      lastSignInTime,
    },
  }
}
