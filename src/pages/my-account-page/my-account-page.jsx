import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateAccountActivity } from '../../actions/firebase-db/firebase-db'
import Button from '@material-ui/core/Button'

const MyAccountPage = (props) => {
  const deactivateAccount = () => {
    console.log(props.user)
    props.actions.updateAccountActivity(props.user, true)
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
          onClick={() => deactivateAccount()}
        >
          Deactivate account
        </Button>
        <Button color="secondary">Delete account</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(
      {
        updateAccountActivity,
      },
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccountPage)
