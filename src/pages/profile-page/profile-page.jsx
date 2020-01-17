import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth/auth'
import { fetchPreferences } from '../../actions/firebase-db/firebase-db'
import { fetchApartmentMetaData } from '../../actions/contentful'
import ChosenPreferences from '../../components/chosenPreferences/chosenPreferences'
import './profile-page.css'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
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
    await this.props.actions.fetchPreferences(uid)
    await this.props.actions.fetchApartmentMetaData()
  }

  handleLogout = () => {
    this.props.actions.logoutUser()
  }

  render() {
    const { isLoggingOut, logoutError, areas, preferences } = this.props
    return (
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
