import { WithStyles } from '@material-ui/core'

import styles from './ErrorContainerStyles'

export type Props = WithStyles<typeof styles> & {
  failingActionText: string
}
