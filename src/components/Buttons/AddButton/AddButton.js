import React from 'react'
import { Link } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add'

import { withStyles } from '@material-ui/core'
import styles from './AddButtonStyles'

const AddButton = (props) => {
  return (
    <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <button className={props.classes.addButton}>
        <AddIcon />
      </button>
    </Link>
  )
}

export default withStyles(styles)(AddButton)
