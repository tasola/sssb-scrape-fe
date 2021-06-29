import React from 'react'

import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

import styles from './ErrorContainerStyles'
import { Props } from './types'

const ErrorContainer = ({ failingActionText, classes }: Props): JSX.Element => (
  <div className={classes.errorContainer}>
    <Typography variant="h6" color="textPrimary" component="h4">
      {`We failed to ${failingActionText}. Please try again in a moment!`}
    </Typography>
  </div>
)

export default withStyles(styles)(ErrorContainer)
