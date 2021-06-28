import { WithStyles } from '@material-ui/core'
import { Entry } from 'contentful'
import { Area } from 'src/redux/slices/contentful/types'
import { Preference } from 'src/redux/slices/user/types'

import styles from './ChosenPreferencesStyles'

export type Props = WithStyles<typeof styles> & {
  areas: Entry<Area>[];
  preferences: Preference[];
}