import React, { Component } from 'react'

import { capitalizeFirstLetter } from '../../../utils/utils'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

class CheckboxGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedItems: new Map(),
      hasSavedValues: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.checkedItems !== prevState.checkedItems) {
      return {
        checkedItems: nextProps.checkedItems,
        hasSavedValues: nextProps.checkedItems.size > 0,
      }
    } else return null
  }

  getCheckedState = (type) => {
    const savedType = this.props.checkedItems.get(type)
    const { hasSavedValues } = this.state
    const { availableApartmentTypes } = this.props
    if (
      savedType === undefined &&
      !hasSavedValues &&
      availableApartmentTypes.includes(type)
    )
      return true
    return savedType || false
  }

  generateCheckboxes = () => {
    const { availableApartmentTypes } = this.props
    return availableApartmentTypes.map((type) => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={this.getCheckedState(type)}
              onChange={this.props.handleChange}
              id={type}
              value="primary"
              color="primary"
            />
          }
          key={type}
          label={capitalizeFirstLetter(type)}
        />
      )
    })
  }

  render() {
    return <>{this.generateCheckboxes()}</>
  }
}

export default CheckboxGroup
