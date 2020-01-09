import React, { Component } from 'react'
import { capitalizeFirstLetter } from '../../utils/utils'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class TextSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  getSelectItems = () => {
    return this.props.selectItems.map((item, index) => (
      <MenuItem key={index} value={item}>
        {item}
      </MenuItem>
    ))
  }

  render() {
    const { isOpen } = this.state
    const { title, className, handleChange, value } = this.props
    const formClass = `text-select ${className}`

    return (
      <FormControl className={formClass} fullWidth variant="outlined">
        <InputLabel id="text-select-label">
          {capitalizeFirstLetter(title)}
        </InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={isOpen}
          onClose={this.handleClose}
          onOpen={this.handleOpen}
          value={value}
          onChange={handleChange}
        >
          {this.getSelectItems()}
        </Select>
      </FormControl>
    )
  }
}

export default TextSelect
