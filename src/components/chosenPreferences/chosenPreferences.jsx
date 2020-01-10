import React, { Component } from 'react'
import './chosenPreferences.css'

import Container from '@material-ui/core/Container'

class ChosenPreferences extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { className } = this.props

    return (
      <Container
        className={`chosen-preferences ${className}`}
        component="main"
        maxWidth="xs"
      >
        <h1>hej</h1>
      </Container>
    )
  }
}

export default ChosenPreferences
