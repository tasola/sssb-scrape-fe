import { WithStyles } from '@material-ui/core'
import { Area, Preference } from 'src/components/ChosenPreferenceCard/types'

import styles from './ChosenPreferencesStyles'

export type Props = WithStyles<typeof styles> & {
  areas: Area[];
  preferences: Preference[];
}