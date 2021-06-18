import { WithStyles } from '@material-ui/core'

import styles from './NavbarStyles'

export type Props = WithStyles<typeof styles> & {
  username: string;
  userEmail: string;
  actions: Actions;
}

type Actions = {
  logoutUser: () => void;
}

export type StateToProps = {
  userEmail: string;
}