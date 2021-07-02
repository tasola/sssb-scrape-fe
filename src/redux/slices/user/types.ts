export type InitialState = {
  preferences: Preference[]
  isActive: boolean
  isModifyingPreference: boolean
  preferenceModificationSucceeded: boolean
  preferenceModificationFailed: boolean
  isFetchingPreferences: boolean
  preferencesFetchSucceeded: boolean
  preferencesFetchFailed: boolean
  isRemovingPreference: boolean
  preferenceRemovalSucceeded: boolean
  preferenceRemovalFailed: boolean
  isFetchingAccountActiveness: boolean
  accountActivenessFetchSucceeded: boolean
  accountActivenessFetchFailed: boolean
  isModifyingAccountActiveness: boolean
  accountActivenessModifcationSucceeded: boolean
  accountActivenessModificationFailed: boolean
}

export type Preference = {
  area: string
  floors: number[]
  types: string[]
}
