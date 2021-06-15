import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUpUser } from '../../actions/auth/auth'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import { withStyles } from '@material-ui/styles'
import styles from './SignUpPageStyles'

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
      hasCheckedPasswords: true,
    })
    return passwordMatches
  }

  render() {
    const { classes, loginError, isAuthenticated, user, isLoggingIn } =
      this.props
    const { passwordMatches, hasCheckedPasswords } = this.state
    if (isAuthenticated && user.emailVerified) {
      return <Redirect to="/" />
    } else if (user.emailVerified === false) {
      return <Redirect to="verify-email" />
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
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
              id="passwordVerification"
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
              {isLoggingIn ? (
                <>
                  <CircularProgress className={classes.loading} size={18} />{' '}
                  Loading...{' '}
                </>
              ) : (
                <>Sign up</>
              )}
            </Button>
            <Typography className={classes.alreadyGotAnAccount}>
              Already got an account?{' '}
              <Link className={classes.goToLogin} to="/login">
                Sign in here
              </Link>
            </Typography>
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
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(SignUpPage))
