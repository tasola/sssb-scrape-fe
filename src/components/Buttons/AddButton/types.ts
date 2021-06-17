import { WithStyles } from "@material-ui/core"
import styles from './AddButtonStyles'

export type Props = WithStyles<typeof styles> & {
  to: string,
}