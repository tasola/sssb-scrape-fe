import React, { Component } from 'react'
import { connect } from 'react-redux'
import { modifyProfile } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './profile-modify-page-style'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '@material-ui/core/Container'

class ProfileModifyPage extends Component {
  state = {}

  handleAgeChange = ({ target }) => {
    this.setState({ age: target.value })
  }

  handleSubmit = () => {
    const { dispatch, user } = this.props
    const { age } = this.state
    console.log(user)
    dispatch(modifyProfile(user, age))
  }

  render() {
    const { classes } = this.props
    // const { passwordMatches, hasCheckedPasswords } = this.state
    console.log(this.state)
    console.log(this.props)
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          About you
        </Typography>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value="{age}"
            onChange={this.handleAgeChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className="SOMETHING"
          onClick={this.handleSubmit}
        >
          Save
        </Button>
      </Container>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  }
}

export default withStyles(styles)(connect(mapStateToProps)(ProfileModifyPage))
