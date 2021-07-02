import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAccountActiveness,
  modifyAccountActiveness,
} from 'src/redux/functions/user/thunks'
import { RootState } from 'src/redux/store/store'
import { useEffect } from 'react'
import { useState } from 'react'
import debounce from 'lodash.debounce'

import { withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/Error'
import Accordion from '@material-ui/core/Accordion'
import CircularProgress from '@material-ui/core/CircularProgress'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Chip from '@material-ui/core/Chip'

import styles from './AccountPageStyles'
import { Props } from './types'
import { contentText } from './text'
import { useCallback } from 'react'

const AccountPage = ({ classes }: Props) => {
  const [doShowChip, setDoShowChip] = useState(false)

  const dispatch = useDispatch()

  const { active, inactive, request } = contentText.subscription

  const { user } = useSelector((state: RootState) => state.auth)
  const {
    isActive,
    isFetchingAccountActiveness,
    isModifyingAccountActiveness,
    accountActivenessFetchSucceeded,
    accountActivenessModifcationSucceeded,
    accountActivenessFetchFailed,
    accountActivenessModificationFailed,
  } = useSelector((state: RootState) => state.user)

  const subscriptionContent = isActive ? active : inactive

  useEffect(() => {
    dispatch(fetchAccountActiveness(user))
  }, [])

  useEffect(() => {
    doShowChip && debouncedHide()
  }, [doShowChip])

  // Make sure that the instance of debounce() is the same across renders
  const debouncedHide = useCallback(
    debounce(() => setDoShowChip(false), 5000),
    [setDoShowChip]
  )

  const handleChange = (): void => {
    setDoShowChip(true)
    dispatch(modifyAccountActiveness(!isActive, user))
  }

  const handleDeleteChip = (): void => setDoShowChip(false)

  const getChip = (): JSX.Element | null => {
    const { text, icon } =
      accountActivenessModifcationSucceeded || accountActivenessFetchSucceeded
        ? {
            text: `${request.succeeded} ${subscriptionContent.status}`,
            icon: <CheckIcon />,
          }
        : accountActivenessFetchFailed || accountActivenessModificationFailed
        ? {
            text: request.failed,
            icon: <ErrorIcon />,
          }
        : {
            text: undefined,
            icon: undefined,
          }

    if (!text || isFetchingAccountActiveness || isModifyingAccountActiveness) {
      return null
    }

    return (
      <Chip
        variant="outlined"
        icon={icon}
        label={text}
        size="small"
        onDelete={handleDeleteChip}
      />
    )
  }

  return (
    <Container component="main" maxWidth="md">
      <Typography
        variant="h4"
        color="textPrimary"
        component="h2"
        className={classes.header}
      >
        Your account
      </Typography>
      <Accordion
        classes={{
          root: classes.MuiAccordionRoot,
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.accordionHeader}>
            {subscriptionContent.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.detailsWrapper}>
          <Typography className={classes.text}>
            {subscriptionContent.text}
          </Typography>
          <div className={classes.switch}>
            <div className={classes.switchStatus}>
              {(isFetchingAccountActiveness ||
                isModifyingAccountActiveness) && (
                <CircularProgress size="2em" />
              )}
            </div>
            <FormControlLabel
              control={
                <Switch
                  checked={isActive}
                  onChange={handleChange}
                  name="activitySwitch"
                  color="primary"
                />
              }
              label="Active"
            />
            <div
              className={[
                doShowChip ? 'active' : null,
                classes.chipWrapper,
              ].join(' ')}
            >
              {getChip()}
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

export default withStyles(styles)(AccountPage)
