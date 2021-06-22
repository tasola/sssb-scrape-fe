import { WithStyles } from '@material-ui/core'

import { FirebaseUser } from '../ProfileModifyPage/types'
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