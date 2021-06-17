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

import { loginUser } from '../../actions/auth/auth'
import styles from './LoginPageStyles'

const Login = ({
  dispatch,
  loginError,
  isAuthenticated,
  isLoggingIn,
  classes,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = ({ target }) => setEmail(target.value)

  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleSubmit = () => dispatch(loginUser(email, password))

  if (isAuthenticated) {
    return <Redirect to="/" />
  }

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
          onClick={handleSubmit}
        >
          {isLoggingIn ? (
            <>
              <CircularProgress className={classes.loading} size={18} /> Loading
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

const mapStateToProps = (state) => ({
  isLoggingIn: state.auth.isLoggingIn,
  loginError: state.auth.loginError,
  isAuthenticated: state.auth.isAuthenticated,
})

export default withStyles(styles)(connect(mapStateToProps)(Login))
