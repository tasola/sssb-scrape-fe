import React from 'react'

import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import styles from './NoPreferencesStyles'
import { Props } from './types'

const NoPreferences = ({ classes }: Props): JSX.Element => (
  <div className={classes.noPreferences}>
    <Typography variant="h6" color="textPrimary" component="h4">
      You don&apos;t have any subscriptions... <br /> Add one below!
    </Typography>
  </div>
)

export default withStyles(styles)(NoPreferences)
