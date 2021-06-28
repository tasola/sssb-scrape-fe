import React from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { verifyAuth } from 'src/redux/functions/auth'

import { GmailLogo } from '../../assets/email-logos/gmail.js'
import { OutlookLogo } from '../../assets/email-logos/outlook.js'
import { Props, StateToProps } from './types'
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

const VerifyEmailPage = ({ user, actions, classes }: Props): JSX.Element => {
  const styles = useStyles()

  const goHome = async (): Promise<void> => {
    await actions.verifyAuth()
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

const mapStateToProps = (state): StateToProps => ({
  user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      verifyAuth,
    },
    dispatch
  ),
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage)
)
