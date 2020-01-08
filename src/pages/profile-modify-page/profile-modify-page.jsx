import React, { Component } from 'react'
import { connect } from 'react-redux'
import { modifyProfile } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './profile-modify-page-style'
import { fetchAreas } from '../../actions/contentful'

import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '@material-ui/core/Container'

class ProfileModifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenArea: ''
    }
    this.getAreaTitles = this.getAreaTitles.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchAreas()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.areas !== prevState.areas) {
      return { areas: nextProps.areas }
    } else return null
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleAreaChange = ({ target }) => {
    this.setState({ chosenArea: target.value })
  }

  handleSubmit = () => {
    const { dispatch, user } = this.props
    const { age } = this.state
    console.log(user)
    dispatch(modifyProfile(user, age))
  }

  getAreaTitles = () => {
    this.props.areas.map((area, index) => console.log(area))
    return this.props.areas.map((area, index) => (
      <MenuItem key={index} value={area.fields.title}>
        {area.fields.title}
      </MenuItem>
    ))
  }

  render() {
    const { classes, areas } = this.props
    console.log(areas)
    const { open, chosenArea } = this.state
    console.log(this.state)
    console.log(this.props)
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          About you
        </Typography>
        {this.state.areas && (
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-label">Area</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={this.handleClose}
              onOpen={this.handleOpen}
              value={chosenArea}
              onChange={this.handleAreaChange}
            >
              {this.getAreaTitles()}
            </Select>
          </FormControl>
        )}
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
    user: state.auth.user,
    areas: state.contentful.areas
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, { fetchAreas })(ProfileModifyPage)
)
