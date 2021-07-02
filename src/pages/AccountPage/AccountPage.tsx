import React from 'react'

import { withStyles } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import styles from './AccountPageStyles'
import { Props } from './types'
import { contentText } from './text'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAccountActiveness,
  modifyAccountActiveness,
} from 'src/redux/functions/user/thunks'
import { RootState } from 'src/redux/store/store'
import { useEffect } from 'react'

const AccountPage = ({ classes }: Props) => {
  const dispatch = useDispatch()

  const { user } = useSelector((state: RootState) => state.auth)
  const { isActive } = useSelector((state: RootState) => state.user)

  const subscriptionContent = isActive
    ? contentText.subscription.active
    : contentText.subscription.inactive

  useEffect(() => {
    dispatch(fetchAccountActiveness(user))
  })

  const handleChange = (): void => {
    dispatch(modifyAccountActiveness(!isActive, user))
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
          <FormControlLabel
            className={classes.switch}
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
        </AccordionDetails>
      </Accordion>
    </Container>
  )
}

export default withStyles(styles)(AccountPage)
