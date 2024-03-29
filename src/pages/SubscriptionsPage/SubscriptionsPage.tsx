import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import ChosenPreferences from 'src/components/ChosenPreferences/ChosenPreferences'
import { fetchApartmentMetaData } from 'src/redux/functions/contentful/thunks'
import { fetchPreferences as fetchUserPreferences } from 'src/redux/functions/user/thunks'
import { Preference } from 'src/redux/slices/user/types'
import { RootState } from 'src/redux/store/store'

import { arraysEqual } from '../../utils/utils'
import { LocationState } from '../SubscriptionModificationPage/types'
import { Props } from './types'

const SubscriptionsPage = ({ location }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [preferences, setPreferences] = useState<Preference[]>([])

  const dispatch = useDispatch()

  const { user, isLoggingOut } = useSelector((state: RootState) => state.auth)
  const { preferences: basePreferences, preferencesFetchFailed } = useSelector(
    (state: RootState) => state.user
  )
  const { areas } = useSelector((state: RootState) => state.contentful)

  useEffect(() => {
    if (location.isFromSubscriptionModification) {
      const newPreferences = renderObjectFromLocationState(
        basePreferences,
        location.state
      )
      setPreferences(newPreferences)
    } else {
      fetchPreferences()
    }
  }, [])

  useEffect(() => {
    if (!location?.isFromSubscriptionModification) {
      setPreferences(basePreferences)
    }
  }, [location.isFromSubscriptionModification, basePreferences])

  const fetchPreferences = useCallback(() => {
    const { uid } = user
    setIsLoading(true)

    Promise.all([
      dispatch(fetchUserPreferences(uid)),
      dispatch(fetchApartmentMetaData()),
    ])
      .then(() => {
        setPreferences(basePreferences)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [user])

  const checkPreferenceUpdate = useCallback((preference, locationState) => {
    if (preference.area === locationState.area) {
      const updatedFloors = handleFloorUpdate(preference, locationState)
      const updatedTypes = handleTypeUpdate(preference, locationState)
      return {
        ...preference,
        floors: updatedFloors,
        types: updatedTypes,
      }
    }
    return preference
  }, [])

  // Checks if the floors have updated from /modify, and modifies state accordingly
  const handleFloorUpdate = (
    preference: Preference,
    locationState: LocationState
  ): number[] => {
    if (!arraysEqual(preference.floors, locationState.floors)) {
      return locationState.floors
    }
    return preference.floors
  }

  // Checks if the types have updated from /modify, and modifies state accordingly
  const handleTypeUpdate = (
    preference: Preference,
    locationState: LocationState
  ): string[] => {
    if (!arraysEqual(preference.types, locationState.types)) {
      return locationState.types
    }
    return preference.types
  }

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

  return (
    <div>
      {isLoggingOut && <p>Logging Out....</p>}
      {preferencesFetchFailed && (
        <p>Error fetching preferences, please try again in a bit</p>
      )}
      {preferences && areas?.length > 0 && (
        <ChosenPreferences
          preferences={preferences}
          areas={areas}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default SubscriptionsPage
