import React from 'react'

import { capitalizeFirstLetter } from '../../../utils/utils'

import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const CheckboxGroup = ({
  availableApartmentTypes,
  handleChange,
  checkedItems: _checkedItems,
}) => {
  const hasSavedValues = _checkedItems.size > 0
  const checkedItems = new Map(_checkedItems)

  const getCheckedState = (type) => {
    const savedType = checkedItems.get(type)
    if (!hasSavedValues && availableApartmentTypes.includes(type)) {
      return true
    }
    return savedType || false
  }

  return (
    <>
      {availableApartmentTypes.map((type) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={getCheckedState(type)}
                onChange={handleChange}
                id={type}
                value="primary"
                color="primary"
              />
            }
            key={type}
            label={capitalizeFirstLetter(type)}
          />
        )
      })}
    </>
  )
}

export default CheckboxGroup
