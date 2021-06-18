import React from 'react'
import { useState } from 'react'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { capitalizeFirstLetter } from '../../utils/utils'
import { Props } from './types'

const TextSelect = ({
  selectItems,
  title,
  className,
  handleChange,
  value,
  isDisabled,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClose = (): void => setIsOpen(false)

  const handleOpen = (): void => setIsOpen(true)

  const getSelectItems = (): JSX.Element[] => {
    return selectItems.map((item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    ))
  }

  const formClass = `text-select ${className}`

  return (
    <FormControl
      className={formClass}
      fullWidth
      variant="outlined"
      disabled={isDisabled}
    >
      <InputLabel id="text-select-label">
        {capitalizeFirstLetter(title)}
      </InputLabel>
      <Select
        labelId="controlled-open-select-label"
        id="controlled-open-select"
        open={isOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        value={value}
        onChange={handleChange}
      >
        {getSelectItems()}
      </Select>
    </FormControl>
  )
}

export default TextSelect
