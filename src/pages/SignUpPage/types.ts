import { WithStyles } from '@material-ui/core'
import { User as FirebaseUser } from 'src/redux/slices/auth/types'

import styles from './SignUpPageStyles'

export type Props = StateToProps & WithStyles<typeof styles> & {
  dispatch: any;
}

export type StateToProps = {
  loginError: boolean;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  user: FirebaseUser;
}