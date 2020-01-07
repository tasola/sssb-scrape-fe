import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { signUpUser } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './sign-up-page-style'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

class SignUpPage extends Component {
  state = { email: '', password: '', hasCheckedPasswords: false }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value })
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value })
  }

  handlePasswordVerificationChange = ({ target }) => {
    this.setState({ passwordVerification: target.value })
  }

  handleSubmit = () => {
    const { dispatch } = this.props
    const { email, password } = this.state
    if (!this.passwordMatches()) return
    dispatch(signUpUser(email, password))
  }

  passwordMatches() {
    const { password, passwordVerification } = this.state
    const passwordMatches = password === passwordVerification
    this.setState({
      passwordMatches: passwordMatches,
      hasCheckedPasswords: true
    })
    return passwordMatches
  }

  render() {
    const { classes, loginError, isAuthenticated } = this.props
    const { passwordMatches, hasCheckedPasswords } = this.state
    if (isAuthenticated) {
      return <Redirect to="/" />
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={this.handleEmailChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handlePasswordChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="passwordVerification"
              label="Verify password"
              type="password"
              id="password"
              onChange={this.handlePasswordVerificationChange}
            />
            {passwordMatches && loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
            {hasCheckedPasswords && !passwordMatches && (
              <Typography component="p" className={classes.errorText}>
                Passwords don't match
              </Typography>
            )}
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
            <Link to="/login">Already got an account? Sign in here</Link>
          </Paper>
        </Container>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default withStyles(styles)(connect(mapStateToProps)(SignUpPage))
