import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchApartmentMetaData } from 'src/redux/functions/contentful'
import { removePreferenceFromDb, modifyProfile } from 'src/redux/functions/user'
import { Area } from 'src/redux/slices/contentful/types'
import { RootState } from 'src/redux/store/store'

import CheckboxGroup from '../../components/Checkbox/CheckboxGroup/CheckboxGroup'
import UnsubscribeDialog from '../../components/Dialogs/UnsubscribeDialog/UnsubscribeDialog'
import TextSelect from '../../components/TextSelect/TextSelect'
import { range, capitalizeFirstLetter } from '../../utils/utils'
import styles from './ProfileModifyPageStyles'
import { Props, HistoryPushObject } from './types'

const ProfileModifyPage = ({ location, classes }: Props): JSX.Element => {
  const [chosenArea, setChosenArea] = useState<string>('')
  const [maxFloor, setMaxFloor] = useState<number | undefined>(undefined)
  const [chosenFloor, setChosenFloor] = useState<number | null>(null)
  const [chosenFloorRange, setChosenFloorRange] = useState<number[]>([])
  const [availableFloors, setAvailableFloors] = useState<number[]>([])
  const [chosenAreaObject, setChosenAreaObject] = useState<Area | null>(null)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [availableTypes, setAvailableTypes] = useState<string[]>([])
  const [checkedItems, setCheckedItems] = useState<Map<string, boolean>>(new Map())

  const { areas } = useSelector((state: RootState) => state.contentful)
  const { user } = useSelector((state: RootState) => state.auth)

  const history = useHistory()

  const generateChosenTypesMap = (types: string[]): Map<string, boolean> => {
    const typesMap = new Map()
    types.forEach((type) => typesMap.set(type, true))
    return typesMap
  }

  const getAvailableTypes = (areaObject: Area): string[] => {
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

  const updateState = (areaObject: Area, area?: string, floor?: number, savedTypes?: string[]): void => {
    const title = area || areaObject.fields.title
    const maxFloor = areaObject.fields?.floors
    const chosenFloorRange = floor ? range(floor, maxFloor) : range(maxFloor)
    const types = getAvailableTypes(areaObject)
    const chosenTypesMap =
      savedTypes && savedTypes.length
        ? generateChosenTypesMap(savedTypes)
        : generateChosenTypesMap(areaObject.fields.types.types)

    setChosenArea(capitalizeFirstLetter(title))
    setMaxFloor(maxFloor)
    setChosenFloor(floor || null)
    setChosenFloorRange(chosenFloorRange)
    setAvailableFloors(range(maxFloor))
    setChosenAreaObject(areaObject)
    setAvailableTypes(types)
    setCheckedItems(chosenTypesMap || new Map())
  }

  const getAreaObjectFromName = (areaName: string): Area | undefined=> {
    return areas.find(
      (area) => area.fields.title.toLowerCase() === areaName.toLowerCase()
    )
  }

  const setupStateFromLinkLocation = (area: string, floor: number, savedTypes: string[]): void => {
    const areaObject = getAreaObjectFromName(area)
    if (!areaObject) {
      return
    }

    updateState(areaObject, area, floor, savedTypes)
  }

  useEffect(() => {
    fetchApartmentMetaData()
    if (location?.state) {
      const { area, floors, types } = location.state
      setupStateFromLinkLocation(area, floors[0], types)
    }
  }, [])

  const generateChosenTypes = (): string[] => {
    const chosenTypes: string[] = []
    for (const [key, value] of checkedItems) {
      if (value) chosenTypes.push(key)
    }
    return chosenTypes
  }

  const goHome = (pushObject?: HistoryPushObject): void => {
    history.push(pushObject || '/')
  }

  const handleCancel = (): void => goHome()

  const handleAreaChange = ({ target }): void => {
    const areaObject = getAreaObjectFromName(target.value)

    if (!areaObject) {
      return 
    }

    updateState(areaObject)
  }

  const handleFloorChange = ({ target }): void => {
    const minimumFloor: number = target.value
    setChosenFloor(minimumFloor)
    setChosenFloorRange(range(minimumFloor, maxFloor))
  }

  const handleCheckboxChange = (e): void => {
    const item = e.target.id
    const isChecked = e.target.checked
    setCheckedItems(new Map(checkedItems.set(item, isChecked)))
  }

  const handleDialogOpen = (): void => setOpenDialog(true)

  const handleDialogClose = (): void => setOpenDialog(false)

  const handleRemove = async (): Promise<void> => {
    await removePreferenceFromDb(user, chosenArea)
    handleDialogClose()
    goHome()
  }

  // In case the floor drop down was not interacted with, handleFloor() was not
  // called, hence chosenFloorRange will just be the chosen floor, not the actual range.
  // In this case, adjust it to the range.
  const setFloorRange = (chosenFloorRange: number[]): number[] => {
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
  const handleSubmit = (): void => {
    const chosenTypes = generateChosenTypes()
    const chosenAreaToLowerCase = chosenArea.toLowerCase()
    const _chosenFloorRange = setFloorRange(chosenFloorRange)

    modifyProfile(user, chosenArea, _chosenFloorRange, chosenTypes)

    const historyPushObject = {
      pathname: '/',
      isFromProfileModify: true,
      state: {
        area: chosenAreaToLowerCase,
        floors: _chosenFloorRange,
        areaObject: chosenAreaObject,
        types: chosenTypes,
      },
    }

    goHome(historyPushObject)
  }

  const checkedItemsIsEmpty = (): boolean => {
    if (checkedItems.size < 1) return true
    for (const [, value] of checkedItems) {
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
              handleChange={(e): void => handleAreaChange(e)}
              selectItems={areas.map((a) => a.fields.title)}
            />
            <TextSelect
              title="Minimum floor"
              className={classes.selectPreferences}
              value={chosenFloor || 0}
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
              chosenArea === '' || chosenFloor === undefined || checkedItemsIsEmpty()
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

export default withStyles(styles)(ProfileModifyPage)
