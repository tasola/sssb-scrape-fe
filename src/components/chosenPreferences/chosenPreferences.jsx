import React, { Component } from 'react'
import ChosenPreferenceCard from '../ChosenPreferenceCard/ChosenPreferenceCard.jsx'
import AddButton from '../Buttons/AddButton/AddButton'
import './ChosenPreferences.css'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import NoPreferences from '../NoPreferences/NoPreferences.jsx'

class ChosenPreferences extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.preferences !== prevState.preferences) {
      return { preferences: nextProps.preferences }
    } else return null
  }

  // Improve this
  getAreaObjectFromName = (areaName) => {
    const { areas } = this.props
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i]
      if (area.fields.title.toLowerCase() === areaName) return area
    }
  }

  getImage = (areaObject) => 'https:' + areaObject.fields.image.fields.file.url

  getAreaDescription = (areaObject) => areaObject.fields.description

  sortAreaObjectsOnName = (arr) => {
    return arr.sort((a, b) => {
      if (a.area > b.area) return 1
      else if (a.area < b.area) return -1
      return 0
    })
  }

  getSelectItems = () => {
    const { areas } = this.props
    const preferences = this.sortAreaObjectsOnName(this.state.preferences)
    return areas ? (
      preferences.map((preference, index) => {
        const areaObject = this.getAreaObjectFromName(
          preference.area.toLowerCase()
        )
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

  render() {
    const { className } = this.props
    const { preferences } = this.state
    return (
      <Container
        className={`chosen-preferences ${className}`}
        component="main"
        maxWidth="md"
      >
        <Typography
          variant="h4"
          color="textPrimary"
          component="h2"
          className="chosenPreferences"
        >
          Your subscription
        </Typography>
        {preferences.length > 0 ? (
          <Grid container spacing={10}>
            {this.getSelectItems()}
          </Grid>
        ) : (
          <NoPreferences />
        )}
        <AddButton to="profile/modify" />
      </Container>
    )
  }
}

export default ChosenPreferences
