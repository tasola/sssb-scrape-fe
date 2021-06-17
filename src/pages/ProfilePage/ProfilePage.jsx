import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchApartmentMetaData } from '../../actions/contentful'
import { fetchPreferences } from '../../actions/firebase-db/firebase-db'
import ChosenPreferences from '../../components/ChosenPreferences/ChosenPreferences'
import { range, arraysEqual } from '../../utils/utils'

const ProfilePage = ({
  actions,
  location,
  preferences: basePreferences,
  user,
  isLoggingOut,
  preferenceFetchFailed,
  areas,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isFromProfileModify, setIsFromProfileModify] = useState(false)
  const [preferences, setPreferences] = useState([])

  useEffect(() => {
    if (location.isFromProfileModify) {
      setIsFromProfileModify(true)
    } else {
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
    }
  }, [])

  useEffect(() => {
    if (isFromProfileModify) {
      const newPreferences = renderObjectFromLocationState(
        basePreferences,
        location.state
      )
      setPreferences(newPreferences)
    }
  }, [isFromProfileModify])

  useEffect(() => {
    if (!isFromProfileModify) {
      setPreferences(basePreferences)
    }
  }, [basePreferences])

  // Modifies the state so that the application does not have to wait for
  // Firebase to load the changes from /modify
  const renderObjectFromLocationState = (_preferences, locationState) => {
    let isNewArea = true

    let newPreferences = _preferences.map((preference) => {
      if (preference.area === locationState.area) {
        isNewArea = false
      }
      return checkPreferenceUpdate(preference, locationState)
    })

    if (isNewArea) {
      newPreferences.push({
        area: locationState.area,
        floors: locationState.floor,
        types: locationState.types,
      })
    }

    return newPreferences
  }

  const checkPreferenceUpdate = (preference, locationState) => {
    if (preference.area === locationState.area) {
      handleFloorUpdate(preference, locationState)
      handleTypeUpdate(preference, locationState)
    }
    return preference
  }

  // Checks if the floors have updated from /modify, and modifies state accordingly
  const handleFloorUpdate = (preference, locationState) => {
    if (preference.floors !== range(locationState.floor)) {
      preference.floors = locationState.floor
    }
  }

  // Checks if the types have updated from /modify, and modifies state accordingly
  const handleTypeUpdate = (preference, locationState) => {
    if (!arraysEqual(preference.types, locationState.types)) {
      preference.types = locationState.types
    }
  }

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

const mapStateToProps = (state) => ({
  isLoggingOut: state.auth.isLoggingOut,
  user: state.auth.user,
  areas: state.contentful.areas,
  preferences: state.firebaseDb.preferences,
  isFetchingPreferences: state.firebaseDb.isFetchingPreferences,
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
