import React, { Component } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'

class BaseDialog extends Component {
  render() {
    const {
      handleDialogClose,
      openDialog,
      heading,
      text,
      secondaryButtonLabel,
      primaryButtonLabel,
      primaryAction
    } = this.props
    return (
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            {secondaryButtonLabel}
          </Button>
          <Button
            onClick={primaryAction}
            color="primary"
            id="destructive-button"
          >
            {primaryButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default BaseDialog
