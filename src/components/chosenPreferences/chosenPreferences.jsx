import React, { Component } from 'react'
import './chosenPreferences.css'

import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
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
    console.log(areas)
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i]
      console.log(area)
      if (area.fields.title === areaName) return area
    }
  }

  getImage = areaObject => 'https:' + areaObject.fields.image.fields.file.url

  getAreaDescription = areaObject => areaObject.fields.description

  getSelectItems = () => {
    const { areas } = this.props
    return areas ? (
      this.state.preferences.map((item, index) => {
        const areaObject = this.getAreaObjectFromName(item.area)
        return (
          <Card className="areaCard" key={index}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={this.getImage(areaObject)}
              title={item.area}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.area}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="h5"
                className="floors"
              >
                Floors {item.floors[0]}-{item.floors[item.floors.length - 1]}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="h4">
                {this.getAreaDescription(areaObject)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" className="learnMore">
                Learn More
              </Button>
            </CardActions>
          </Card>
        )
      })
    ) : (
      <h1>Loading...</h1>
    )
  }

  render() {
    const { className } = this.props
    console.log(this.props)
    return (
      <Container
        className={`chosen-preferences ${className}`}
        component="main"
        maxWidth="xs"
      >
        {this.getSelectItems()}
      </Container>
    )
  }
}

export default ChosenPreferences
