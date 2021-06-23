export type Preference = {
  area: string;
  floors: number[];
  types: string[];
}

export type InitialState = {
  preferences: Preference[];
  isModifyingProfile: boolean;
  profileModificationSucceeded: boolean;
  profileModificationFailed: boolean;
  isFetchingPreferences: boolean;
  preferencesFetchSucceeded: boolean;
  preferencesFetchFailed: boolean;
  isRemovingPreference: boolean;
  preferenceRemovalSucceeded: boolean;
  preferenceRemovalFailed: boolean;
}