import React from 'react'
import { useState } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import { signUpUser } from '../../actions/auth/auth'
import styles from './SignUpPageStyles'

const SignUpPage = ({
  dispatch,
  loginError,
  isAuthenticated,
  user,
  isLoggingIn,
  classes,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerification, setPasswordVerification] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const [hasCheckedPasswords, setHasCheckedPasswords] = useState(false)

  const handleEmailChange = ({ target }) => setEmail(target.value)

  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handlePasswordVerificationChange = ({ target }) =>
    setPasswordVerification(target.value)

  const handleSubmit = () => {
    if (!passwordMatches()) return
    dispatch(signUpUser(email, password))
  }

  const passwordMatches = () => {
    const _passwordsMatch = password === passwordVerification
    setPasswordsMatch(_passwordsMatch)
    setHasCheckedPasswords(true)
    return _passwordsMatch
  }

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
            onChange={handleEmailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handlePasswordChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="passwordVerification"
            label="Verify password"
            type="password"
            id="passwordVerification"
            onChange={handlePasswordVerificationChange}
          />
          {passwordsMatch && loginError && (
            <Typography component="p" className={classes.errorText}>
              Incorrect email or password.
            </Typography>
          )}
          {hasCheckedPasswords && !passwordsMatch && (
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
            onClick={handleSubmit}
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

const mapStateToProps = (state) => ({
  isLoggingIn: state.auth.isLoggingIn,
  loginError: state.auth.loginError,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default withStyles(styles)(connect(mapStateToProps)(SignUpPage))
