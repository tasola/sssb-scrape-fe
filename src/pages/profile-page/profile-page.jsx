import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/auth/auth'
import { fetchPreferences } from '../../actions/firebase-db/firebase-db'
import ChosenPreferences from '../../components/chosenPreferences/chosenPreferences'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    const { uid } = this.props.user
    console.log(uid)
    await this.props.actions.fetchPreferences(uid)
  }

  handleLogout = () => {
    this.props.actions.logoutUser()
  }

  render() {
    const { isLoggingOut, logoutError } = this.props
    console.log(this.props)
    return (
      <div>
        <h1>This is the profile page.</h1>
        <p>Any routes here will also be protected</p>
        <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        <Link to="profile/modify">Modify your profile</Link>
        <ChosenPreferences className="profile-page" />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError,
    user: state.auth.user,
    preferences: state.firebaseDb.preferences
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchPreferences,
        logoutUser
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
