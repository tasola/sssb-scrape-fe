import React from 'react'
import { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAccountActivity,
  updateAccountActivity,
  deleteAccountData,
} from '../../actions/firebase-db/firebase-db'
import { deleteUserAccount } from '../../actions/auth/auth'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/styles'
import styles from './my-account-page'

const MyAccountPage = (props) => {
  useEffect(() => {
    props.actions.fetchAccountActivity(props.user.uid)
  }, [props.actions, props.actions.fetchAccountActivity, props.user.uid])

  const changeAccountActivity = () => {
    props.actions.updateAccountActivity(props.user, !props.isActive)
  }

  const deleteAccount = () => {
    props.actions.deleteAccountData(props.user)
    props.actions.deleteUserAccount()
  }

  console.log(props)

  return (
    <div>
      <h1>My account</h1>
      <div>
        <h3>Delete account</h3>
        <hr />
        <p>Lorem ipsum</p>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => changeAccountActivity()}
        >
          {`${props.isActive ? 'Deactivate' : 'Activate'} account`}
          {props.isRequestingAccountActivity && (
            <CircularProgress className={props.classes.spinner} />
          )}
        </Button>
        <Button color="secondary" onClick={() => deleteAccount()}>
          Delete account
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    userIsActive,
    isDeletingUserData,
    isUserDataDeleted,
    userDataDeletionError,
    isRequestingAccountActivity,
  } = state.firebaseDb
  const { isDeletingUser, userDeletionError } = state.auth
  return {
    user: state.auth.user,
    isActive: userIsActive,
    isDeletingUserData: isDeletingUserData,
    isUserDataDeleted: isUserDataDeleted,
    userDataDeletionError: userDataDeletionError,
    isRequestingAccountActivity: isRequestingAccountActivity,
    isDeletingUser: isDeletingUser,
    userDeletionError: userDeletionError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        fetchAccountActivity,
        updateAccountActivity,
        deleteAccountData,
        deleteUserAccount,
      },
      dispatch
    ),
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
)
