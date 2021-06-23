import { WithStyles } from '@material-ui/core'
import { User as FirebaseUser } from 'src/redux/slices/auth/types'
import { Area } from 'src/redux/slices/contentful/types'

import styles from './ProfileModifyPageStyles'

export type Props = StateToProps & WithStyles<typeof styles> & {
  location: Location;
  actions: ProfileModifyPageActions;
}

export type StateToProps = {
  areas: Area[];
  user: User;
}

export type HistoryPushObject = {
  pathname: string;
  isFromProfileModify: boolean;
  state: LocationState;
}

export type Location = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: LocationState;
}

export type LocationState = {
  area: string;
  floors: number[];
  types: string[];
  areaObject?: Area | null;
}

export type User = {
  additionalUserInfo: AdditionalUserInfo;
  operationType: string;
  user: FirebaseUser;
  credential?: string;
}

type AdditionalUserInfo = {
  isNewUser: boolean;
  providerId: string;
}

type ProfileModifyPageActions = {
  fetchApartmentMetaData: () => void;
  modifyProfile: (user: User, chosenArea: string, chosenFloorRange: number[], chosenTypes: string[]) => void;
  removePreferenceFromDb: (user: User, chosenArea: string) => void;
}