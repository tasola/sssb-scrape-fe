import React from 'react'

import { withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChosenPreferenceCard from 'src/components/ChosenPreferenceCard/ChosenPreferenceCard'

import AddButton from '../Buttons/AddButton/AddButton'
import { Area, Preference } from '../ChosenPreferenceCard/types'
import NoPreferences from '../NoPreferences/NoPreferences.jsx'
import styles from './ChosenPreferencesStyles'
import { Props } from './types'

const ChosenPreferences = ({ areas, preferences, classes }: Props): JSX.Element => {
  const getAreaObjectFromName = (areaName: string): Area | undefined =>
    areas.find((area) => area.fields.title.toLowerCase() === areaName)

  const sortPreferencesOnName = (arr: Preference[]): Preference[] => {
    return arr.sort((a, b) => {
      if (a.area > b.area) return 1
      else if (a.area < b.area) return -1
      return 0
    })
  }

  const getSelectItems = (): JSX.Element[] | JSX.Element => {
    const sortedPreferences = sortPreferencesOnName(preferences)
    return areas ? (
      sortedPreferences.map((preference, index) => {
        const areaObject = getAreaObjectFromName(preference.area.toLowerCase())
        if (!areaObject) {
          return <></>
        }
        
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
