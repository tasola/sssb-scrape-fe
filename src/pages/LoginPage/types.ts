import { WithStyles } from '@material-ui/core'

import styles from './LoginPageStyles'

export type Props = StateToProps & WithStyles<typeof styles> & {
  dispatch: (action) => void;
}

export type StateToProps = {
  loginError: boolean;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
}
