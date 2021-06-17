import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { modifyProfile } from '../../actions'
import { fetchApartmentMetaData } from '../../actions/contentful'
import { removePrefenceFromDb } from '../../actions/firebase-db/firebase-db'
import CheckboxGroup from '../../components/Checkbox/CheckboxGroup/CheckboxGroup.jsx'
import UnsubscribeDialog from '../../components/Dialogs/UnsubscribeDialog/UnsubscribeDialog'
import TextSelect from '../../components/TextSelect/TextSelect'
import { range, capitalizeFirstLetter } from '../../utils/utils'
import styles from './ProfileModifyPageStyles'

const ProfileModifyPage = ({ actions, areas, user, location, classes }) => {
  const [chosenArea, setChosenArea] = useState('')
  const [maxFloor, setMaxFloor] = useState(null)
  const [chosenFloor, setChosenFloor] = useState('')
  const [chosenFloorRange, setChosenFloorRange] = useState([])
  const [availableFloors, setAvailableFloors] = useState([])
  const [chosenAreaObject, setChosenAreaObject] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [availableTypes, setAvailableTypes] = useState([])
  const [checkedItems, setCheckedItems] = useState(new Map())

  const history = useHistory()

  useEffect(() => {
    actions.fetchApartmentMetaData()
    if (location && location.state) {
      const { area, floors, types } = location.state
      setupStateFromLinkLocation(area, floors[0], types)
    }
  }, [])

  const setupStateFromLinkLocation = (area, floor, savedTypes) => {
    const areaObject = getAreaObjectFromName(area)
    updateState(areaObject, area, floor, savedTypes)
  }

  const getAreaObjectFromName = (areaName) => {
    if (!areaName || typeof areaName !== 'string') {
      return
    }
    return areas.find(
      (area) => area.fields.title.toLowerCase() === areaName.toLowerCase()
    )
  }

  const getAvailableTypes = (areaObject) => {
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

  const generateChosenTypes = () => {
    const chosenTypes = []
    for (let [key, value] of checkedItems) {
      if (value) chosenTypes.push(key)
    }
    return chosenTypes
  }

  const generateChosenTypesMap = (types) => {
    const typesMap = new Map()
    types.forEach((type) => typesMap.set(type, true))
    return typesMap
  }

  const handleCancel = () => goHome()

  const handleAreaChange = ({ target }) => {
    const areaObject = getAreaObjectFromName(target.value)
    updateState(areaObject)
  }

  const updateState = (areaObject, area, floor, savedTypes) => {
    const title = area || areaObject.fields.title
    const maxFloor = areaObject.fields && areaObject.fields.floors
    const chosenFloorRange = floor ? range(floor, maxFloor) : range(maxFloor)
    const types = getAvailableTypes(areaObject)
    const chosenTypesMap =
      savedTypes && savedTypes.length
        ? generateChosenTypesMap(savedTypes)
        : generateChosenTypesMap(areaObject.fields.types.types)

    setChosenArea(capitalizeFirstLetter(title))
    setMaxFloor(maxFloor)
    setChosenFloor(floor || '')
    setChosenFloorRange(chosenFloorRange)
    setAvailableFloors(range(maxFloor))
    setChosenAreaObject(areaObject)
    setAvailableTypes(types)
    setCheckedItems(chosenTypesMap || new Map())
  }

  const handleFloorChange = ({ target }) => {
    const minimumFloor = target.value
    setChosenFloor(minimumFloor)
    setChosenFloorRange(range(minimumFloor, maxFloor))
  }

  const handleCheckboxChange = (e) => {
    const item = e.target.id
    const isChecked = e.target.checked
    setCheckedItems(new Map(checkedItems.set(item, isChecked)))
  }

  const handleDialogOpen = () => setOpenDialog(true)

  const handleDialogClose = () => setOpenDialog(false)

  const handleRemove = async () => {
    await actions.removePrefenceFromDb(user, chosenArea)
    handleDialogClose()
    goHome()
  }

  // In case the floor drop down was not interacted with, handleFloor() was not
  // called, hence chosenFloorRange will just be the chosen floor, not the actual range.
  // In this case, adjust it to the range.
  const setFloorRange = (chosenFloorRange) => {
    if (
      chosenFloorRange.length === 1 &&
      typeof chosenFloorRange[0] === 'string'
    ) {
      return (chosenFloorRange = range(parseInt(chosenFloorRange[0]), maxFloor))
    }
    return chosenFloorRange
  }

  // historyPushObject is for instant preference representation, instead of
  // having to wait for firestore to update and then fetch
  const handleSubmit = () => {
    const chosenTypes = generateChosenTypes()
    const chosenAreaToLowerCase = chosenArea.toLowerCase()
    const _chosenFloorRange = setFloorRange(chosenFloorRange)
    actions.modifyProfile(user, chosenArea, _chosenFloorRange, chosenTypes)
    const historyPushObject = {
      pathname: '/',
      isFromProfileModify: true,
      state: {
        area: chosenAreaToLowerCase,
        floor: _chosenFloorRange,
        areaObject: chosenAreaObject,
        types: chosenTypes,
      },
    }
    goHome(historyPushObject)
  }

  const goHome = (pushObject) => {
    history.push(pushObject || '/')
  }

  const checkedItemsIsEmpty = () => {
    if (checkedItems.size < 1) return true
    for (let [_, value] of checkedItems) {
      if (value === true) return false
    }
    return true
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        className={classes.profileModifyPage}
      >
        <Typography component="h1" variant="h5">
          Apartment preferences
        </Typography>
        {areas && (
          <>
            <TextSelect
              title="area"
              className={classes.selectPreferences}
              value={chosenArea}
              isDisabled={false}
              handleChange={handleAreaChange}
              selectItems={areas.map((a) => a.fields.title)}
            />
            <TextSelect
              title="Minimum floor"
              className={classes.selectPreferences}
              value={chosenFloor}
              isDisabled={chosenArea === ''}
              handleChange={handleFloorChange}
              selectItems={availableFloors || []}
            />
            <CheckboxGroup
              availableApartmentTypes={availableTypes}
              handleChange={handleCheckboxChange}
              checkedItems={checkedItems}
            />
          </>
        )}
        <div className={classes.modifyPreferencesButtons}>
          <Button
            type="button"
            color="primary"
            className={`${classes.removePreferences} ${classes.destructiveButton}`}
            disabled={!chosenArea}
            onClick={handleDialogOpen}
          >
            Remove
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={
              chosenArea === '' || chosenFloor === '' || checkedItemsIsEmpty()
            }
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button type="button" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        <UnsubscribeDialog
          handleDialogClose={handleDialogClose}
          openDialog={openDialog}
          unsubscribeAction={handleRemove}
        />
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  areas: state.contentful.areas,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      fetchApartmentMetaData,
      modifyProfile,
      removePrefenceFromDb,
    },
    dispatch
  ),
})

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(ProfileModifyPage)
)
