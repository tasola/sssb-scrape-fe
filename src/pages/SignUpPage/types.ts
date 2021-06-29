import { WithStyles } from '@material-ui/core'

import styles from './SignUpPageStyles'

export type Props = WithStyles<typeof styles> & {
  dispatch: any
}
