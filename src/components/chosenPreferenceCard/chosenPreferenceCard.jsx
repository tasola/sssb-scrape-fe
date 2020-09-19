import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { anglifySwedishLetters, capitalizeFirstLetter } from '../../utils/utils'
import './ChosenPreferenceCard.css'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class ChosenPreferenceCard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.setState({ id: this.props.id })
  }

  getImage = (areaObject) => 'https:' + areaObject.fields.image.fields.file.url

  getAreaDescription = (areaObject) => areaObject.fields.description

  getFloorsOfInterestText = (preference) => {
    let floorsOfInterestText
    if (preference.floors.length > 1) {
      floorsOfInterestText = `Floors of interest: ${preference.floors[0]} - ${
        preference.floors[preference.floors.length - 1]
      }`
    } else {
      floorsOfInterestText = `Floor of interest: ${preference.floors[0]}`
    }
    return floorsOfInterestText
  }

  generateCollapsableDescription = (description) => {
    const preview = description.substr(0, 150)
    const rest = description.substr(150, description.length)
    const { id } = this.state
    return (
      <p>
        {preview}
        <span id={'dots' + id}>...</span>
        <span className={'rest rest' + id}>{rest}</span>
      </p>
    )
  }

  showMore = () => {
    const { id } = this.state
    const dots = document.getElementById(`dots${id}`)
    const rest = document.getElementsByClassName(`rest${id}`)[0]
    const buttonText = document.getElementById(`readMoreButton${id}`)
    if (dots.style.display === 'none') {
      dots.style.display = 'inline'
      buttonText.innerHTML = 'Read more'
      rest.style.display = 'none'
    } else {
      dots.style.display = 'none'
      buttonText.innerHTML = 'Read less'
      rest.style.display = 'inline'
    }
  }

  navigateToSssb = (areaObject) => {
    let area =
      areaObject.fields.title === 'Hugin' || areaObject.fields.title === 'Munin'
        ? 'hugin-munin'
        : areaObject.fields.title
    area = anglifySwedishLetters(area)
    const sssbLink = `https://www.sssb.se/en/our-housing/our-areas-in-the-${
      areaObject.fields.cardinalDirection
    }/${area.toLowerCase()}`
    window.open(sssbLink, '_blank')
  }

  render() {
    const { preference, areaObject, id } = this.props
    const areaDescription = this.getAreaDescription(areaObject)
    return (
      <Grid item md={6}>
        <Card className="areaCard">
          <CardMedia
            component="img"
            alt={preference.area}
            height="140"
            image={this.getImage(areaObject)}
            title={preference.area}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {capitalizeFirstLetter(preference.area)}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="h5"
              className="floors"
            >
              {this.getFloorsOfInterestText(preference)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h4">
              {this.generateCollapsableDescription(areaDescription)}
            </Typography>
            <Button
              size="small"
              color="primary"
              className="learnMore"
              onClick={this.showMore}
              id={'readMoreButton' + id}
            >
              Read More
            </Button>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className="learnMore"
              onClick={() => this.navigateToSssb(areaObject)}
            >
              See more at SSSB
            </Button>
            <Button size="small" color="primary" className="edit">
              <Link
                to={{
                  pathname: 'profile/modify',
                  state: {
                    fromPreferenceCard: true,
                    area: preference.area,
                    floors: preference.floors,
                    types: preference.types,
                  },
                }}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Edit
              </Link>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    )
  }
}

export default ChosenPreferenceCard
