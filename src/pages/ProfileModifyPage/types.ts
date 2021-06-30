import { WithStyles } from '@material-ui/core'
import { Entry } from 'contentful'
import { User as FirebaseUser } from 'src/redux/slices/auth/types'
import { Area } from 'src/redux/slices/contentful/types'

import styles from './ProfileModifyPageStyles'

export type Props = WithStyles<typeof styles> & {
  location: Location
}

export type HistoryPushObject = {
  pathname: string
  isFromProfileModify: boolean
  state: LocationState
}

export type Location = {
  hash: string
  key: string
  pathname: string
  search: string
  state: LocationState
}

export type LocationState = {
  area: string
  floors: number[]
  types: string[]
  areaObject?: Entry<Area> | null
}

export type User = {
  additionalUserInfo: AdditionalUserInfo
  operationType: string
  user: FirebaseUser
  credential?: string
}

type AdditionalUserInfo = {
  isNewUser: boolean
  providerId: string
}
