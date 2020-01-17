import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logoutUser } from '../../actions/auth/auth'
import { Redirect, Link } from 'react-router-dom'
import { signUpUser } from '../../actions/auth/auth'
import { withStyles } from '@material-ui/styles'
// import styles from './sign-up-page-style'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

class VerifyEmailPage extends Component {
  state = { email: '', password: '', hasCheckedPasswords: false }

  handleLogout = () => {
    console.log('logging out user')

    this.props.actions.logoutUser()
  }

  // handleEmailChange = ({ target }) => {
  //   this.setState({ email: target.value })
  // }

  // handlePasswordChange = ({ target }) => {
  //   this.setState({ password: target.value })
  // }

  // handlePasswordVerificationChange = ({ target }) => {
  //   this.setState({ passwordVerification: target.value })
  // }

  // handleSubmit = () => {
  //   const { dispatch } = this.props
  //   const { email, password } = this.state
  //   if (!this.passwordMatches()) return
  //   dispatch(signUpUser(email, password))
  // }

  // passwordMatches() {
  //   const { password, passwordVerification } = this.state
  //   const passwordMatches = password === passwordVerification
  //   this.setState({
  //     passwordMatches: passwordMatches,
  //     hasCheckedPasswords: true
  //   })
  //   return passwordMatches
  // }

  render() {
    const { classes, loginError, isAuthenticated } = this.props
    return (
      <div>
        Verify your email!<button onClick={this.handleLogout}>Logout</button>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     isLoggingIn: state.auth.isLoggingIn,
//     loginError: state.auth.loginError,
//     isAuthenticated: state.auth.isAuthenticated
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        logoutUser
      },
      dispatch
    )
  }
}

export default connect(null, mapDispatchToProps)(VerifyEmailPage)
