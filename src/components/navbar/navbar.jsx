import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logoutUser } from '../../actions/auth/auth'

import logo from '../../assets/favicon.ico'

import { pathnameDict } from '../../utils/pathname-dict'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import { makeStyles, withStyles } from '@material-ui/core/styles'
import styles from './NavbarStyles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const Navbar = (props) => {
  const styles = useStyles()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleLogout = () => {
    props.actions.logoutUser()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const displayUsername = () => {
    if (props.username) return props.username
    else if (props.userEmail)
      return props.userEmail.substring(0, props.userEmail.indexOf('@'))
    else return ''
  }

  const { classes } = props

  return (
    <div className={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Link to="/">
              <img src={logo} className={classes.navbarImage} alt="logo" />
            </Link>
          </IconButton>
          <Typography variant="h6" className={styles.title}>
            {pathnameDict[location.pathname]}
          </Typography>
          <div className={classes.floatRight}>
            <Typography className={classes.username}>
              {displayUsername()}
            </Typography>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout} className={classes.logout}>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userEmail: state.auth.user.email || state.auth.user.user.email,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        logoutUser,
      },
      dispatch
    ),
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
)
