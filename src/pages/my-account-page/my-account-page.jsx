import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  fetchAccountActivity,
  updateAccountActivity,
} from '../../actions/firebase-db/firebase-db'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useEffect } from 'react'

const MyAccountPage = (props) => {
  useEffect(() => {
    props.actions.fetchAccountActivity(props.user.uid)
  }, [props.actions, props.actions.fetchAccountActivity, props.user.uid])

  const changeAccountActivity = () => {
    props.actions.updateAccountActivity(props.user, !props.isActive)
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
          {props.isRequestingAccountActivity && <CircularProgress />}
        </Button>
        <Button color="secondary">Delete account</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isActive: state.firebaseDb.userIsActive,
    isRequestingAccountActivity: state.firebaseDb.isRequestingAccountActivity,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        fetchAccountActivity,
        updateAccountActivity,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
