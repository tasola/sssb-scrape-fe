import React, { Component } from 'react'
import BaseDialog from '../base-dialog/base-dialog.jsx'

const unsubscribeDialogText = {
  heading: 'Do you really want to unsubscribe?',
  text:
    'Deleting this object prevents you from getting subscription emails about releases related to this area in the future. Are you sure you want to unsubscribe?',
  secondaryButtonLabel: 'Cancel',
  primaryButtonLabel: 'Unsubscribe'
}

class UnsubscribeDialog extends Component {
  render() {
    const { handleDialogClose, openDialog } = this.props
    const {
      heading,
      text,
      secondaryButtonLabel,
      primaryButtonLabel
    } = unsubscribeDialogText
    return (
      <BaseDialog
        handleDialogClose={handleDialogClose}
        openDialog={openDialog}
        heading={heading}
        text={text}
        secondaryButtonLabel={secondaryButtonLabel}
        primaryButtonLabel={primaryButtonLabel}
      />
    )
  }
}

export default UnsubscribeDialog
