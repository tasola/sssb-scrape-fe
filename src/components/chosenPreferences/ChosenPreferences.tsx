import React from 'react'

import { withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { Entry } from 'contentful'
import ChosenPreferenceCard from 'src/components/ChosenPreferenceCard/ChosenPreferenceCard'
import { Area } from 'src/redux/slices/contentful/types'
import { Preference } from 'src/redux/slices/user/types'

import AddButton from '../Buttons/AddButton/AddButton'
import NoPreferences from '../NoPreferences/NoPreferences'
import styles from './ChosenPreferencesStyles'
import { Props } from './types'

const ChosenPreferences = ({
  areas,
  preferences,
  isLoading,
  classes,
}: Props): JSX.Element => {
  const getAreaObjectFromName = (areaName: string): Entry<Area> | undefined =>
    areas.find((area) => area.fields.title.toLowerCase() === areaName)

  const sortPreferencesOnName = (arr: Preference[]): Preference[] => {
    return arr.slice().sort((a, b) => {
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

  const getChosenPreferences = () => {
    if (isLoading) {
      return (
        <div className={classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      )
    } else if (preferences.length > 0) {
      return getSelectItems()
    } else {
      return <NoPreferences />
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography
        variant="h4"
        color="textPrimary"
        component="h2"
        className={classes.header}
      >
        Your subscription
      </Typography>
      <Grid container spacing={10} className={classes.grid}>
        {getChosenPreferences()}
      </Grid>
      <AddButton to="profile/modify" />
    </Container>
  )
}

export default withStyles(styles)(ChosenPreferences)
