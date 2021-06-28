import { Entry } from 'contentful'
import { HistoryPushObject } from 'src/pages/ProfileModifyPage/types'
import { User as FirebaseUser } from 'src/redux/slices/auth/types'
import { Area } from 'src/redux/slices/contentful/types'
import { Preference } from 'src/redux/slices/user/types'

export type Props = StateToProps & {
  location: HistoryPushObject;
  actions: ProfilePageActions;
}

export type StateToProps = {
  isLoggingOut: boolean;
  user: FirebaseUser;
  areas: Entry<Area>[];
  preferences: Preference[];
  preferenceFetchFailed: boolean;
}

type ProfilePageActions = {
  fetchPreferences: (uid: string) => void;
  fetchApartmentMetaData: () => void;
}