import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth/auth'
import { fetchPreferences } from '../../actions/firebase-db/firebase-db'
import { fetchApartmentMetaData } from '../../actions/contentful'
import ChosenPreferences from '../../components/chosenPreferences/chosenPreferences'
import { range } from '../../utils/utils'
import './profile-page.css'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: false }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.preferences !== prevState.preferences) {
      return { preferences: nextProps.preferences }
    } else if (nextProps.areas !== prevState.areas) {
      return { areas: nextProps.areas }
    } else return null
  }

  async componentDidMount() {
    const { uid } = this.props.user
    this.setState({ isLoading: true })
    await this.props.actions.fetchPreferences(uid)
    await this.props.actions.fetchApartmentMetaData()
    this.setState({ isLoading: false })
  }

  handleLogout = () => {
    this.props.actions.logoutUser()
  }

  // Modifies the state so that the application does not have to wait for
  // Firebase to load the changes from /modify
  renderObjectFromLocationState = (preferences, locationState) => {
    let isNewArea = true
    preferences.forEach(pref => {
      if (pref.area === locationState.area) isNewArea = false
      pref = this.handleFloorUpdate(pref, locationState)
    })
    isNewArea &&
      preferences.push({
        area: locationState.area,
        floors: range(locationState.floor)
      })
    return preferences
  }

  // Checks if the floors have updated from /modify, and modifies state accordingly
  handleFloorUpdate = (preference, locationState) => {
    if (
      preference.area === locationState.area &&
      preference.floors !== range(locationState.floor)
    ) {
      preference.floors = locationState.floor
    }
    return preference
  }

  render() {
    const { isLoading, isLoggingOut, logoutError, location } = this.props
    let { areas, preferences } = this.props
    if (location.isFromProfileModify)
      this.renderObjectFromLocationState(preferences, location.state)
    return !isLoading ? (
      <div>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        {preferences && areas.length > 0 && (
          <ChosenPreferences
            className="profile-page"
            preferences={preferences}
            areas={areas}
          />
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    areas: state.contentful.areas,
    preferences: state.firebaseDb.preferences,
    isFetchingPreferences: state.firebaseDb.isFetchingPreferences,
    preferenceFetchFailed: state.firebaseDb.preferenceFetchFailed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchPreferences,
        fetchApartmentMetaData,
        logoutUser
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
