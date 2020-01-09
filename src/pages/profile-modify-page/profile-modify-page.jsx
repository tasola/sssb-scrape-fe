import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { modifyProfile } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './profile-modify-page-style'
import { fetchAreas } from '../../actions/contentful'
import TextSelect from '../../components/text-select/text-select'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

class ProfileModifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenArea: '',
      chosenFloor: ''
    }
  }

  async componentDidMount() {
    await this.props.actions.fetchAreas()
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

  handleFloorChange = ({ target }) => {
    this.setState({ chosenFloor: target.value })
  }

  handleSubmit = () => {
    const { user, actions } = this.props
    const { chosenArea } = this.state
    actions.modifyProfile(user, chosenArea)
  }

  render() {
    const { areas, chosenArea, chosenFloor } = this.state
    return (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Apartment preferences
        </Typography>
        {areas && (
          <>
            <TextSelect
              title="area"
              className="area"
              value={chosenArea}
              handleChange={this.handleAreaChange}
              selectItems={areas.map(a => a.fields.title)}
            />
            <TextSelect
              title="Minimum floor"
              className="floor"
              value={chosenFloor}
              handleChange={this.handleFloorChange}
              selectItems={[1, 2, 3]}
            />
          </>
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

const mapStateToProps = state => {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    areas: state.contentful.areas
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        fetchAreas,
        modifyProfile
      },
      dispatch
    )
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProfileModifyPage)
)
