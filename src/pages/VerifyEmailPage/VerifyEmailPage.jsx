import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { verifyAuth } from '../../actions/auth/auth'

import { GmailLogo } from '../../assets/email-logos/gmail.js'
import { OutlookLogo } from '../../assets/email-logos/outlook.js'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import { makeStyles, withStyles } from '@material-ui/core/styles'
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

const VerifyEmailPage = (props) => {
  const goHome = async () => {
    await props.actions.verifyAuth()
    window.location.reload()
  }

  const goToGmail = () => {
    window.open('https://gmail.com', '_blank')
  }

  const goToOutlook = () => {
    window.open('https://outlook.com', '_blank')
  }

  const styles = useStyles()
  const { user, classes } = props
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
                className={`${classes.verifyEmailButton} ${classes.gmail}`}
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
                className={`${classes.verifyEmailButton} ${classes.outlook}`}
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        verifyAuth,
      },
      dispatch
    ),
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(VerifyEmailPage)
)
