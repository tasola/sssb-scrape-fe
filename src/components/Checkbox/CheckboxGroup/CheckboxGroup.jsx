import React from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from 'src/components/Checkbox/Checkbox/Checkbox.jsx'
import { capitalizeFirstLetter } from 'src/utils/utils'

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
