import React from 'react'

import Typography from '@material-ui/core/Typography'

import { withStyles } from '@material-ui/core'
import styles from './NoPreferencesStyles'

const NoPreferences = (props) => {
  const { classes } = props
  return (
    <div className={classes.noPreferences}>
      <Typography variant="h6" color="textPrimary" component="h4">
        You don't have any subscriptions... <br /> Add one below!
      </Typography>
    </div>
  )
}

export default withStyles(styles)(NoPreferences)
