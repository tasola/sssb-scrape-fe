export type FirebaseUser = {
  uid: string;
  displayName?: string;
  email: string;
  refreshToken: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}