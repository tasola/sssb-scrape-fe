import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { modifyProfile } from '../../actions'
import { withStyles } from '@material-ui/styles'
import styles from './profile-modify-page-style'
import { fetchApartmentMetaData } from '../../actions/contentful'
import { removePrefenceFromDb } from '../../actions/firebase-db/firebase-db'
import TextSelect from '../../components/text-select/text-select'
import CheckboxGroup from '../../components/checkbox/checkbox-group/checkbox-group.jsx'
import { range, capitalizeFirstLetter } from '../../utils/utils'
import './profile-modify-page.css'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import UnsubscribeDialog from '../../components/unsubscribe-dialog/unsubscribe-dialog'

class ProfileModifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenArea: '',
      chosenFloor: '',
      openDialog: false,
      availableTypes: [],
      checkedItems: new Map()
    }
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  async componentDidMount() {
    await this.props.actions.fetchApartmentMetaData()
    if (this.props.location.state) {
      const { location } = this.props
      location &&
        this.setupStateFromLinkLocation(
          location.state.area,
          location.state.floors[0],
          location.state.types
        )
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.areas !== prevState.areas) {
      return { areas: nextProps.areas }
    } else return null
  }

  setupStateFromLinkLocation = (area, floor, savedTypes) => {
    const areaObject = this.getAreaObjectFromName(area)
    this.updateState(areaObject, area, floor, savedTypes)
  }

  getAreaObjectFromName = areaName => {
    const { areas } = this.state
    for (let i = 0; i < areas.length; i++) {
      const area = areas[i]
      if (area.fields.title.toLowerCase() === areaName.toLowerCase())
        return area
    }
    return 'Not found'
  }

  getAvailableTypes = areaObject => {
    if (
      areaObject &&
      areaObject.fields &&
      areaObject.fields.types &&
      areaObject.fields.types.types
    ) {
      return areaObject.fields.types.types
    } else {
      return []
    }
  }

  generateChosenTypes = () => {
    const { checkedItems } = this.state
    const chosenTypes = []
    for (let [key, value] of checkedItems) {
      if (value) chosenTypes.push(key)
    }
    return chosenTypes
  }

  generateChosenTypesMap = types => {
    const typesMap = new Map()
    types.forEach(type => typesMap.set(type, true))
    return typesMap
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

  updateState = (areaObject, area, floor, savedTypes) => {
    const title = area ? area : areaObject.fields.title
    const maxFloor = areaObject.fields && areaObject.fields.floors
    const chosenFloorRange = floor ? range(floor, maxFloor) : range(maxFloor)
    const types = this.getAvailableTypes(areaObject)
    const chosenTypesMap =
      savedTypes.length > 0
        ? this.generateChosenTypesMap(savedTypes)
        : this.generateChosenTypesMap(areaObject.fields.types.types)
    this.setState({
      chosenArea: capitalizeFirstLetter(title),
      maxFloor: maxFloor,
      chosenFloor: floor || '',
      chosenFloorRange: chosenFloorRange,
      availableFloors: range(maxFloor),
      chosenAreaObject: areaObject,
      availableTypes: types,
      checkedItems: chosenTypesMap || new Map()
    })
  }

  handleFloorChange = ({ target }) => {
    const minimumFloor = target.value
    this.setState({
      chosenFloor: minimumFloor,
      chosenFloorRange: range(minimumFloor, this.state.maxFloor)
    })
  }

  handleCheckboxChange(e) {
    const item = e.target.id
    const isChecked = e.target.checked
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }))
  }

  handleDialogOpen = () => this.setState({ openDialog: true })

  handleDialogClose = () => this.setState({ openDialog: false })

  handleRemove = async () => {
    const { actions, user } = this.props
    const { chosenArea } = this.state
    await actions.removePrefenceFromDb(user, chosenArea)
    this.handleDialogClose()
    this.goHome()
  }

  // In case the floor drop down was not interacted with, this.handleFloor() was not
  // called, hence chosenFloorRange will just be the chosen floor, not the actual range.
  // In this case, adjust it to the range.
  setFloorRange = chosenFloorRange => {
    if (
      chosenFloorRange.length === 1 &&
      typeof chosenFloorRange[0] === 'string'
    ) {
      const { maxFloor } = this.state
      return (chosenFloorRange = range(parseInt(chosenFloorRange[0]), maxFloor))
    }
    return chosenFloorRange
  }

  // historyPushObject is for instant preference representation, instead of
  // having to wait for firestore to update and then fetch
  handleSubmit = () => {
    const { user, actions } = this.props
    const { chosenArea, chosenAreaObject } = this.state
    let { chosenFloorRange } = this.state
    const chosenTypes = this.generateChosenTypes()
    const chosenAreaToLowerCase = chosenArea.toLowerCase()
    chosenFloorRange = this.setFloorRange(chosenFloorRange)
    actions.modifyProfile(user, chosenArea, chosenFloorRange, chosenTypes)
    const historyPushObject = {
      pathname: '/',
      isFromProfileModify: true,
      state: {
        area: chosenAreaToLowerCase,
        floor: chosenFloorRange,
        areaObject: chosenAreaObject,
        types: chosenTypes
      }
    }
    this.goHome(historyPushObject)
  }

  goHome = pushObject => {
    this.props.history.push(pushObject || '/')
  }

  checkedItemsIsEmpty = () => {
    const { checkedItems } = this.state
    if (checkedItems.size < 1) return true
    for (let [_, value] of checkedItems) {
      if (value === true) return false
    }
    return true
  }

  render() {
    const {
      areas,
      chosenArea,
      chosenFloor,
      availableFloors,
      openDialog,
      availableTypes
    } = this.state
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
              <CheckboxGroup
                availableApartmentTypes={availableTypes}
                handleChange={this.handleCheckboxChange}
                checkedItems={this.state.checkedItems}
              />
            </>
          )}
          <div className="modify-preferences-buttons">
            <Button
              type="button"
              color="primary"
              className="remove-preferences"
              id="destructive-button"
              onClick={this.handleDialogOpen}
            >
              Remove
            </Button>
            <Button
              type="button"
              variant="contained"
              color="primary"
              className="save-preferences"
              disabled={
                chosenArea === '' ||
                chosenFloor === '' ||
                this.checkedItemsIsEmpty()
              }
              onClick={this.handleSubmit}
            >
              Save
            </Button>
            <Button
              type="button"
              color="primary"
              className="cancel-preferences"
              onClick={this.handleCancel}
            >
              Cancel
            </Button>
          </div>
          <UnsubscribeDialog
            handleDialogClose={this.handleDialogClose}
            openDialog={openDialog}
            unsubscribeAction={this.handleRemove}
          />
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
        modifyProfile,
        removePrefenceFromDb
      },
      dispatch
    )
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProfileModifyPage)
)
