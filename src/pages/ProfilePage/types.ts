import { Preference, Area } from 'src/components/ChosenPreferenceCard/types'
import { HistoryPushObject, FirebaseUser } from 'src/pages/ProfileModifyPage/types'

export type Props = StateToProps & {
  location: HistoryPushObject;
  actions: ProfilePageActions;
}

export type StateToProps = {
  isLoggingOut: boolean;
  user: FirebaseUser;
  areas: Area[];
  preferences: Preference[];
  preferenceFetchFailed: boolean;
}

type ProfilePageActions = {
  fetchPreferences: (uid: string) => void;
  fetchApartmentMetaData: () => void;
}