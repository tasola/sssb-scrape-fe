import React from 'react'

import BaseDialog from '../BaseDialog/BaseDialog'
import { Props } from './types'

const unsubscribeDialogText = {
  heading: 'Do you really want to unsubscribe?',
  text: 'Deleting this object prevents you from getting subscription emails about releases related to this area in the future. Are you sure you want to unsubscribe?',
  secondaryButtonLabel: 'Cancel',
  primaryButtonLabel: 'Unsubscribe',
}

const UnsubscribeDialog = ({
  handleDialogClose,
  openDialog,
  unsubscribeAction,
}: Props): JSX.Element => {
  const { heading, text, secondaryButtonLabel, primaryButtonLabel } =
    unsubscribeDialogText

  return (
    <BaseDialog
      handleDialogClose={handleDialogClose}
      openDialog={openDialog}
      heading={heading}
      text={text}
      secondaryButtonLabel={secondaryButtonLabel}
      primaryButtonLabel={primaryButtonLabel}
      primaryAction={unsubscribeAction}
    />
  )
}

export default UnsubscribeDialog
