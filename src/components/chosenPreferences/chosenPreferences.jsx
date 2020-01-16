import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ChosenPreferenceCard from '../chosenPreferenceCard/chosenPreferenceCard.jsx'
import './chosenPreferences.css'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

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
  getAreaObjectFromName = areaName => {
    const { areas } = this.props
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i]
      if (area.fields.title === areaName) return area
    }
  }

  getImage = areaObject => 'https:' + areaObject.fields.image.fields.file.url

  getAreaDescription = areaObject => areaObject.fields.description

  getSelectItems = () => {
    const { areas } = this.props
    return areas ? (
      this.state.preferences.map((preference, index) => {
        const areaObject = this.getAreaObjectFromName(preference.area)
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
        <Grid container spacing={6}>
          {this.getSelectItems()}
        </Grid>
        <Button variant="contained" color="primary" className="edit-button">
          <Link
            to="profile/modify"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Edit Preferences
          </Link>
        </Button>
      </Container>
    )
  }
}

export default ChosenPreferences
