import React from 'react'

import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Entry } from 'contentful'
import { Link } from 'react-router-dom'
import { Area } from 'src/redux/slices/contentful/types'
import { Preference } from 'src/redux/slices/user/types'

import { anglifySwedishLetters, capitalizeFirstLetter } from '../../utils/utils'
import styles from './ChosenPreferenceCardStyles'
import { Props } from './types'

const ChosenPreferenceCard = ({
  preference,
  areaObject,
  id,
  classes,
}: Props): JSX.Element => {
  const getImageUrl = (areaObject: Entry<Area>): string =>
    'https:' + areaObject.fields.image.fields.file.url

  const getAreaDescription = (areaObject: Entry<Area>): string =>
    areaObject.fields.description

  const getFloorsOfInterestText = (preference: Preference): string => {
    return preference.floors.length > 1
      ? `Floors of interest: ${preference.floors[0]} - ${
          preference.floors[preference.floors.length - 1]
        }`
      : `Floor of interest: ${preference.floors[0]}`
  }

  const generateCollapsableDescription = (description: string): JSX.Element => {
    const preview = description.substr(0, 150)
    const rest = description.substr(150, description.length)
    return (
      <p>
        {preview}
        <span id={'dots' + id}>...</span>
        <span className={`${classes.rest} rest${id}`}>{rest}</span>
      </p>
    )
  }

  const showMore = (): void => {
    const dots = document.getElementById(`dots${id}`)
    const rest = document.getElementsByClassName(`rest${id}`)[0]
    const buttonText = document.getElementById(`readMoreButton${id}`)
    if (buttonText && rest instanceof HTMLElement) {
      if (dots?.style.display === 'none') {
        dots.style.display = 'inline'
        buttonText.innerHTML = 'Read more'
        rest.style.display = 'none'
      } else if (dots) {
        dots.style.display = 'none'
        buttonText.innerHTML = 'Read less'
        rest.style.display = 'inline'
      }
    }
  }

  const navigateToSssb = (areaObject: Entry<Area>): void => {
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

  const areaDescription = getAreaDescription(areaObject)
  return (
    <Grid item md={6}>
      <Card className={classes.areaCard}>
        <CardMedia
          component="img"
          alt={preference.area}
          height="140"
          image={getImageUrl(areaObject)}
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
            className={classes.floors}
          >
            {getFloorsOfInterestText(preference)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h4">
            {generateCollapsableDescription(areaDescription)}
          </Typography>
          <Button
            size="small"
            color="primary"
            className={classes.readMore}
            onClick={showMore}
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
            className={classes.toSssbButton}
            onClick={(): void => navigateToSssb(areaObject)}
          >
            See more at SSSB
          </Button>
          <Button size="small" color="primary">
            <Link
              to={{
                pathname: 'subscription/modify',
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

export default withStyles(styles)(ChosenPreferenceCard)
