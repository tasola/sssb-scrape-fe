import React from 'react'

import { withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'

import styles from './AddButtonStyles'

const AddButton = (props) => {
  console.log('sdad')

  return (
    <Link to={props.to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <button className={props.classes.addButton}>
        <AddIcon />
      </button>
    </Link>
  )
}

export default withStyles(styles)(AddButton)
