import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import logo from 'src/assets/favicon.ico'
import { logoutUser } from 'src/redux/functions/auth/thunks'
import { RootState } from 'src/redux/store/store'

import { pathnameDict } from '../../utils/pathname-dict'
import styles from './NavbarStyles'
import { Props } from './types'

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

const Navbar = ({ classes }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState(null)

  const styles = useStyles()
  const location = useLocation()
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => state.auth)

  const handleMenu = (event): void => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => setAnchorEl(null)

  const handleLogout = (): void => {
    dispatch(logoutUser())
  }

  const displayUsername = (): string => {
    if (user.email) {
      return user.email.substring(0, user.email.indexOf('@'))
    } else return ''
  }

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
              open={!!anchorEl}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My subscriptions</MenuItem>
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

export default withStyles(styles)(Navbar)
