import React from 'react'

import { withStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'

import styles from './AddButtonStyles'
import { Props } from './types'


const AddButton = ({ to, classes }: Props): JSX.Element => {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <button className={classes.addButton}>
        <AddIcon />
      </button>
    </Link>
  )
}

export default withStyles(styles)(AddButton)
