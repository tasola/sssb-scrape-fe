import { WithStyles } from '@material-ui/core'
import { Area } from 'src/redux/slices/contentful/types'
import { Preference } from 'src/redux/slices/user/types'

import styles from './ChosenPreferenceCardStyles'

export type Props = WithStyles<typeof styles> & {
  preference: Preference;
  areaObject: Area;
  id: number;
}