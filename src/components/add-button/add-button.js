import React from 'react'
import { Link } from 'react-router-dom'
import './add-button.css'

import AddIcon from '@material-ui/icons/Add'

const AddButton = (props) => {
  return (
    <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <button className="add-button">
        <AddIcon />
      </button>
    </Link>
  )
}

export default AddButton
