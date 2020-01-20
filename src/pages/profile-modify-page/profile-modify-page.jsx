import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { modifyProfile } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './profile-modify-page-style'
import { fetchApartmentMetaData } from '../../actions/contentful'
import TextSelect from '../../components/text-select/text-select'
import { range } from '../../utils/utils'
import './profile-modify-page.css'

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
    await this.props.actions.fetchApartmentMetaData()
    if (this.props.location.state) {
      const { location } = this.props
      location &&
        this.setupStateFromLinkLocation(
          location.state.area,
          location.state.floors[0]
        )
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.areas !== prevState.areas) {
      return { areas: nextProps.areas }
    } else return null
  }

  setupStateFromLinkLocation = (area, floor) => {
    const areaObject = this.getAreaObjectFromName(area)
    this.updateState(areaObject, area, floor)
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

  handleCancel = () => {
    this.goHome()
  }

  handleAreaChange = ({ target }) => {
    const areaObject = this.getAreaObjectFromName(target.value)
    this.updateState(areaObject)
  }

  updateState = (areaObject, area, floor) => {
    const title = area ? area : areaObject.fields.title
    const maxFloor = areaObject.fields && areaObject.fields.floors
    this.setState({
      chosenArea: title,
      maxFloor: maxFloor,
      chosenFloor: floor || '',
      chosenFloorRange: range(maxFloor),
      availableFloors: range(maxFloor)
    })
  }

  handleFloorChange = ({ target }) => {
    const minimumFloor = target.value
    this.setState({
      chosenFloor: minimumFloor,
      chosenFloorRange: range(minimumFloor, this.state.maxFloor)
    })
  }

  // historyPushObject is for instant preference representation, instead of
  // having to wait for firestore to update and then fetch
  handleSubmit = () => {
    const { user, actions } = this.props
    const { chosenArea, chosenFloorRange } = this.state
    actions.modifyProfile(user, chosenArea, chosenFloorRange)
    const historyPushObject = {
      pathname: '/',
      isFromProfileModify: true,
      state: {
        area: chosenArea,
        floor: chosenFloorRange
      }
    }
    this.goHome(historyPushObject)
  }

  goHome = pushObject => {
    this.props.history.push(pushObject || '/')
  }

  render() {
    const { areas, chosenArea, chosenFloor, availableFloors } = this.state
    return (
      <>
        <Container
          component="main"
          maxWidth="xs"
          className="profile-modify-page"
        >
          <Typography component="h1" variant="h5">
            Apartment preferences
          </Typography>
          {areas && (
            <>
              <TextSelect
                title="area"
                className="select-preferences area"
                value={chosenArea}
                isDisabled={false}
                handleChange={this.handleAreaChange}
                selectItems={areas.map(a => a.fields.title)}
              />
              <TextSelect
                title="Minimum floor"
                className="select-preferences floor"
                value={chosenFloor}
                isDisabled={chosenArea === ''}
                handleChange={this.handleFloorChange}
                selectItems={availableFloors || []}
              />
            </>
          )}
          <div className="modify-preferences-buttons">
            <Button
              type="button"
              color="primary"
              className="cancel-preferences"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className="save-preferences"
              disabled={chosenArea === '' || chosenFloor === ''}
              onClick={this.handleSubmit}
            >
              Save
            </Button>
          </div>
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
