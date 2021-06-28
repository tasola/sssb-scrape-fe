import { WithStyles } from '@material-ui/core'
import { User as FirebaseUser } from 'src/redux/slices/auth/types'

import styles from './VerifyEmailPageStyles'

export type Props = StateToProps & WithStyles<typeof styles> & {
  actions: VerifyEmailPageActions;
}

export type StateToProps = {
  user: FirebaseUser;
}

type VerifyEmailPageActions = {
  verifyAuth: () => void;
}