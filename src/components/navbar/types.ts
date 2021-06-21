import { WithStyles } from '@material-ui/core'

import styles from './NavbarStyles'

export type Props = WithStyles<typeof styles> & {
  username?: string;
  userEmail: string;
  actions: NavbarActions;
}

export type StateToProps = {
  userEmail: string;
}

type NavbarActions = {
  logoutUser: () => void;
}