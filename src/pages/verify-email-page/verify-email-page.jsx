import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { verifyAuth } from '../../actions/auth/auth'
import { Redirect } from 'react-router-dom'

class VerifyEmailPage extends Component {
  goHome = async () => {
    await this.props.actions.verifyAuth()
    window.location.reload()
    this.props.history.push('/')
  }

  render() {
    const { user } = this.props
    return user.emailVerified ? (
      <Redirect to="/" />
    ) : (
      <div>
        <p>Verify your email!</p>
        <p>
          Have you verified the email? Click{' '}
          <button onClick={this.goHome}>here</button> to go to the app!
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        verifyAuth
      },
      dispatch
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage)
