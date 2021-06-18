import { WithStyles } from '@material-ui/core'
import { Area } from 'src/components/ChosenPreferenceCard/types'

import styles from './ProfileModifyPageStyles'

export type Props = StateToProps & WithStyles<typeof styles> & StateToProps & {
  location: Location;
  actions: Actions;
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

export type FirebaseUser = {
  uid: string;
  displayName?: string;
  email: string;
  refreshToken: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

type AdditionalUserInfo = {
  isNewUser: boolean;
  providerId: string;
}

type Actions = {
  fetchApartmentMetaData: () => void;
  modifyProfile: (user: User, chosenArea: string, chosenFloorRange: number[], chosenTypes: string[]) => void;
  removePreferenceFromDb: (user: User, chosenArea: string) => void;
}