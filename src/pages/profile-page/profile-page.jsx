import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions'

class ProfilePage extends Component {
  handleLogout = () => {
    const { dispatch } = this.props
    dispatch(logoutUser())
  }

  render() {
    const { isLoggingOut, logoutError } = this.props
    return (
      <div>
        <h1>This is the profile page.</h1>
        <p>Any routes here will also be protected</p>
        <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        <Link to="profile/modify">Modify your profile</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  }
}

export default connect(mapStateToProps)(ProfilePage)
