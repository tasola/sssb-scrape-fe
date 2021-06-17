import React from 'react'

import { withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import AddButton from '../Buttons/AddButton/AddButton'
import ChosenPreferenceCard from '../ChosenPreferenceCard/ChosenPreferenceCard.jsx'
import NoPreferences from '../NoPreferences/NoPreferences.jsx'
import styles from './ChosenPreferencesStyles'

const ChosenPreferences = ({ areas, classes, preferences }) => {
  const getAreaObjectFromName = (areaName) =>
    areas.find((area) => area.fields.title.toLowerCase() === areaName)

  const sortAreaObjectsOnName = (arr) => {
    return arr.sort((a, b) => {
      if (a.area > b.area) return 1
      else if (a.area < b.area) return -1
      return 0
    })
  }

  const getSelectItems = () => {
    const sortedPreferences = sortAreaObjectsOnName(preferences)
    return areas ? (
      sortedPreferences.map((preference, index) => {
        const areaObject = getAreaObjectFromName(preference.area.toLowerCase())
        return (
          <ChosenPreferenceCard
            preference={preference}
            areaObject={areaObject}
            id={index}
            key={index}
          />
        )
      })
    ) : (
      <h1>Loading...</h1>
    )
  }

  return (
    <Container
      className={classes.chosenPreferences}
      component="main"
      maxWidth="md"
    >
      <Typography
        variant="h4"
        color="textPrimary"
        component="h2"
        className={classes.header}
      >
        Your subscription
      </Typography>
      {preferences.length > 0 ? (
        <Grid container spacing={10}>
          {getSelectItems()}
        </Grid>
      ) : (
        <NoPreferences />
      )}
      <AddButton to="profile/modify" />
    </Container>
  )
}

export default withStyles(styles)(ChosenPreferences)
