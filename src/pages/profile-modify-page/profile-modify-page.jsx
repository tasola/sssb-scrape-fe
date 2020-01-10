import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { modifyProfile } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './profile-modify-page-style'
import { fetchApartmentMetaData } from '../../actions/contentful'
import TextSelect from '../../components/text-select/text-select'
import { range } from '../../utils/utils'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ChosenPreferences from '../../components/chosenPreferences/chosenPreferences'

class ProfileModifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenArea: '',
      chosenFloor: ''
    }
  }

  async componentDidMount() {
    await this.props.actions.fetchApartmentMetaData()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.areas !== prevState.areas) {
      return { areas: nextProps.areas }
    } else return null
  }

  getAreaObjectFromName = areaName => {
    const { areas } = this.state
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i]
      if (area.fields.title === areaName) return area
    }
    return 'Not found'
  }

  handleClose = () => {
    this.setState({ isOpen: false })
  }

  handleOpen = () => {
    this.setState({ isOpen: true })
  }

  handleAreaChange = ({ target }) => {
    const areaObject = this.getAreaObjectFromName(target.value)
    this.setState({
      chosenArea: areaObject.fields.title,
      maxFloor: areaObject.fields.floors,
      chosenFloorRange: range(areaObject.fields.floors),
      availableFloors: range(areaObject.fields.floors)
    })
  }

  handleFloorChange = ({ target }) => {
    const minimumFloor = target.value
    this.setState({
      chosenFloor: minimumFloor,
      chosenFloorRange: range(minimumFloor, this.state.maxFloor)
    })
  }

  handleSubmit = () => {
    const { user, actions } = this.props
    const { chosenArea, chosenFloorRange } = this.state
    actions.modifyProfile(user, chosenArea, chosenFloorRange)
  }

  render() {
    const { areas, chosenArea, chosenFloor, availableFloors } = this.state
    console.log(this.state)
    return (
      <>
        <ChosenPreferences className="modify-profile" />
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
                isDisabled={false}
                handleChange={this.handleAreaChange}
                selectItems={areas.map(a => a.fields.title)}
              />
              <TextSelect
                title="Minimum floor"
                className="floor"
                value={chosenFloor}
                isDisabled={chosenArea === ''}
                handleChange={this.handleFloorChange}
                selectItems={availableFloors || []}
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
      </>
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
        fetchApartmentMetaData,
        modifyProfile
      },
      dispatch
    )
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProfileModifyPage)
)
