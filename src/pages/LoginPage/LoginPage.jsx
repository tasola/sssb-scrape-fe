import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/auth/auth'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import { withStyles } from '@material-ui/styles'
import styles from './LoginPageStyles'

class Login extends Component {
  state = { email: '', password: '' }

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value })
  }

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value })
  }

  handleSubmit = () => {
    const { dispatch } = this.props
    const { email, password } = this.state
    dispatch(loginUser(email, password))
  }

  render() {
    const { classes, loginError, isAuthenticated, isLoggingIn } = this.props
    console.log(classes)
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
            {loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
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
                  Loading
                </>
              ) : (
                <>Sign In</>
              )}
            </Button>
            <Typography className={classes.alreadyGotAnAccount}>
              Don't have an account?{' '}
              <Link className={classes.goToSignUp} to="/sign-up">
                Sign up here
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
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Login))
