import { WithStyles } from '@material-ui/core'

import styles from './LoginPageStyles'

export type Props = WithStyles<typeof styles> & {
  dispatch: (action) => void
}
