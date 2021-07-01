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

const AccountPage = ({ classes }: Props) => {
  let isActive = true

  const subscriptionContent = isActive
    ? contentText.subscription.active
    : contentText.subscription.inactive

  const handleChange = () => (isActive = !isActive)

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
