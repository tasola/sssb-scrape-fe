import React from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { verifyAuth } from 'src/redux/functions/auth/thunks'
import { RootState } from 'src/redux/store/store.js'

import { GmailLogo } from '../../assets/email-logos/gmail.js'
import { OutlookLogo } from '../../assets/email-logos/outlook.js'
import { Props } from './types'
import styles from './VerifyEmailPageStyles'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

const VerifyEmailPage = ({ classes }: Props): JSX.Element => {
  const styles = useStyles()
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => state.auth)

  const goHome = (): void => {
    dispatch(verifyAuth())
    window.location.reload()
  }

  const goToGmail = (): void => {
    window.open('https://gmail.com', '_blank')
  }

  const goToOutlook = (): void => {
    window.open('https://outlook.com', '_blank')
  }

  return user.emailVerified ? (
    <Redirect to="/" />
  ) : (
    <div className={`${styles.heroContent} ${classes.verifyEmail}`}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Email verification sent!
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          We have sent an email to you to check that you really are you. Some
          large email providers are linked below.
        </Typography>
        <div className={styles.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={goToGmail}
                className={classes.gmail}
              >
                <GmailLogo className={classes.svg} />
                Gmail
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={goToOutlook}
                className={classes.outlook}
              >
                <OutlookLogo className={classes.svg} />
                Outlook
              </Button>
            </Grid>
          </Grid>
        </div>
        <div className={styles.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button color="primary" onClick={goHome}>
                I have verified
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}

export default withStyles(styles)(VerifyEmailPage)
