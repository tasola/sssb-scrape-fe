import React from 'react'
import { Link } from 'react-router-dom'
import './add-button.css'

import AddIcon from '@material-ui/icons/Add'

const AddButton = props => {
  return (
    <button className="add-button">
      <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
        <AddIcon />
      </Link>
    </button>
  )
}

export default AddButton
