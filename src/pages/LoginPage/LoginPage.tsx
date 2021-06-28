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
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { loginUser } from 'src/redux/functions/auth/thunks'
import { RootState } from 'src/redux/store/store'

import styles from './LoginPageStyles'
import { Props } from './types'

const Login = ({ classes }: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch()

  const { loginFailed, isAuthenticated, isLoggingIn } = useSelector((state: RootState) => state.auth)

  const handleEmailChange = ({ target }): void => setEmail(target.value)

  const handlePasswordChange = ({ target }): void => setPassword(target.value)

  const handleSubmit = (): void => {
    dispatch(loginUser(email, password))
  }

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
        {loginFailed && (
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
          Don&apos;t have an account?{' '}
          <Link className={classes.goToSignUp} to="/sign-up">
            Sign up here
          </Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default withStyles(styles)(Login)
