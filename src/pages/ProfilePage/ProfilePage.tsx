import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Preference } from 'src/components/ChosenPreferenceCard/types'
import ChosenPreferences from 'src/components/ChosenPreferences/ChosenPreferences'

import { fetchApartmentMetaData } from '../../actions/contentful'
import { fetchPreferences } from '../../actions/firebase-db/firebase-db'
import { arraysEqual } from '../../utils/utils'
import { LocationState } from '../ProfileModifyPage/types'
import { Props, StateToProps } from './types'

const ProfilePage = ({
  location,
  preferences: basePreferences,
  user,
  isLoggingOut,
  preferenceFetchFailed,
  areas,
  actions,
}: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isFromProfileModify, setIsFromProfileModify] = useState<boolean>(false)
  const [preferences, setPreferences] = useState<Preference[]>([])

  const fetchPreferences = useCallback(() => {
    const { uid } = user
    if (preferences && preferences.length) {
      return
    }

    setIsLoading(true)
    Promise.all([
      actions.fetchPreferences(uid),
      actions.fetchApartmentMetaData(),
    ]).then(() => {
      setPreferences(basePreferences)
      setIsLoading(false)
    })
  }, [preferences, user, actions, basePreferences])

  // Checks if the floors have updated from /modify, and modifies state accordingly
  const handleFloorUpdate = (preference: Preference, locationState: LocationState): number[] => {
     if (!arraysEqual(preference.floors, locationState.floors)) {
       return locationState.floors
     }
     return preference.floors
  }

  // Checks if the types have updated from /modify, and modifies state accordingly
  const handleTypeUpdate = (preference: Preference, locationState: LocationState): string[] => {
    if (!arraysEqual(preference.types, locationState.types)) {
      return locationState.types
    }
    return preference.types
  }

  const checkPreferenceUpdate = useCallback((preference, locationState) => {
    if (preference.area === locationState.area) {
      const updatedFloors = handleFloorUpdate(preference, locationState)
      const updatedTypes = handleTypeUpdate(preference, locationState)
      return {
        ...preference,
        floors: updatedFloors,
        types: updatedTypes
      }
    }
    return preference
  }, [])

  // Modifies the state so that the application does not have to wait for
  // Firebase to load the changes from /modify
  const renderObjectFromLocationState = useCallback(
    (_preferences: Preference[], locationState: LocationState) => {
      let isNewArea = true
      const newPreferences = _preferences.map((preference) => {
        if (preference.area === locationState.area) {
          isNewArea = false
        }
        return checkPreferenceUpdate(preference, locationState)
      })

      if (isNewArea) {
        newPreferences.push({
          area: locationState.area,
          floors: locationState.floors,
          types: locationState.types,
        })
      }

      return newPreferences
    },
    [checkPreferenceUpdate]
  )

  useEffect(() => {
    if (location.isFromProfileModify) {
      setIsFromProfileModify(true)
    } else {
      fetchPreferences()
    }
  }, [location, fetchPreferences])

  useEffect(() => {
    if (isFromProfileModify) {
      const newPreferences = renderObjectFromLocationState(
        basePreferences,
        location.state
      )
      setPreferences(newPreferences)
    }
  }, [
    isFromProfileModify,
    renderObjectFromLocationState,
    basePreferences,
    location,
  ])

  useEffect(() => {
    if (!isFromProfileModify) {
      setPreferences(basePreferences)
    }
  }, [isFromProfileModify, basePreferences])

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {isLoggingOut && <p>Logging Out....</p>}
      {preferenceFetchFailed && (
        <p>Error fetching preferences, please try again in a bit</p>
      )}
      {preferences && areas.length > 0 && (
        <ChosenPreferences preferences={preferences} areas={areas} />
      )}
    </div>
  )
}

const mapStateToProps = (state): StateToProps => ({
  isLoggingOut: state.auth.isLoggingOut,
  user: state.auth.user,
  areas: state.contentful.areas,
  preferences: state.firebaseDb.preferences,
  preferenceFetchFailed: state.firebaseDb.preferenceFetchFailed,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchPreferences,
      fetchApartmentMetaData,
    },
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
