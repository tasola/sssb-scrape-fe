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

const MyAccountPage = ({
  actions,
  user,
  classes,
  isActive,
  isRequestingAccountActivity,
}) => {
  useEffect(() => {
    actions.fetchAccountActivity(user.uid)
  }, [actions, actions.fetchAccountActivity, user.uid])

  const changeAccountActivity = () => {
    actions.updateAccountActivity(user, !isActive)
  }

  const deleteAccount = () => {
    actions.deleteAccountData(user)
    actions.deleteUserAccount()
  }

  console.log(isActive)
  console.log(user)

  return (
    <div>
      <h1>My account</h1>
      <div>
        <h3>Delete account</h3>
        <hr />
        <p>Lorem ipsum</p>
        {isActive !== undefined ? (
          <div className={classes.buttonWrapper}>
            <Button
              color="secondary"
              onClick={() => deleteAccount()}
              className={classes.accountButton}
            >
              Delete account
            </Button>
            <Button
              variant="contained"
              color={isActive ? 'secondary' : 'primary'}
              onClick={() => changeAccountActivity()}
              className={classes.accountButton}
            >
              {`${isActive ? 'Deactivate' : 'Activate'} account`}
              {isRequestingAccountActivity && (
                <CircularProgress className={classes.spinner} />
              )}
            </Button>
          </div>
        ) : (
          <CircularProgress className={classes.spinner} />
        )}
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
