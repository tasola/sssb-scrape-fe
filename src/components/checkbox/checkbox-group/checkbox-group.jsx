import React, { Component } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class CheckboxGroup extends Component {
  generateCheckboxes = () => {
    const { availableApartmentTypes } = this.props
    console.log(availableApartmentTypes)
    return availableApartmentTypes.map(type => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.checkedItems.get(type) || false}
              onChange={this.props.handleChange}
              id={type}
              value="primary"
              color="primary"
            />
          }
          key={type}
          label={type}
        />
      )
    })
  }

  render() {
    return <>{this.generateCheckboxes()}</>
  }
}

export default CheckboxGroup
