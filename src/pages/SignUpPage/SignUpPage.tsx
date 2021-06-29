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
import { signUpUser } from 'src/redux/functions/auth/thunks'

import styles from './SignUpPageStyles'
import { Props, StateToProps } from './types'

const SignUpPage = ({
  loginError,
  isAuthenticated,
  user,
  isLoggingIn,
  dispatch,
  classes,
}: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordVerification, setPasswordVerification] = useState<string>('')
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
  const [hasCheckedPasswords, setHasCheckedPasswords] = useState<boolean>(false)

  const handleEmailChange = ({ target }): void => setEmail(target.value)

  const handlePasswordChange = ({ target }): void => setPassword(target.value)

  const handlePasswordVerificationChange = ({ target }): void =>
    setPasswordVerification(target.value)

  const passwordMatches = (): boolean => {
    const _passwordsMatch = password === passwordVerification
    setPasswordsMatch(_passwordsMatch)
    setHasCheckedPasswords(true)
    return _passwordsMatch
  }

  const handleSubmit = (): void => {
    if (!passwordMatches()) return
    dispatch(signUpUser(email, password))
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
              Passwords don&apos;t match
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

const mapStateToProps = (state): StateToProps => ({
  isLoggingIn: state.auth.isLoggingIn,
  loginError: state.auth.loginError,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})

export default withStyles(styles)(connect(mapStateToProps)(SignUpPage))
