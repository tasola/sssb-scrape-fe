import React from 'react'

import './NoPreferences.css'

import Typography from '@material-ui/core/Typography'

const NoPreferences = () => {
  return (
    <div className="no-preferences">
      <Typography
        variant="h6"
        color="textPrimary"
        component="h4"
        className="chosenPreferences"
      >
        You don't have any subscriptions... <br /> Add one below!
      </Typography>
    </div>
  )
}

export default NoPreferences
