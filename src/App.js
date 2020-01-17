import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import ProtectedRoute from './pages/protected-route/protected-route'
import ProfilePage from './pages/profile-page/profile-page.jsx'
import SignUpPage from './pages/sign-up-page/sign-up-page.jsx'
import Login from './pages/login-page/login-page'
import ProfileModifyPage from './pages/profile-modify-page/profile-modify-page.jsx'
import verifyEmailPage from './pages/verify-email-page/verify-email-page'

const App = props => {
  const { isAuthenticated, isVerifying, user } = props
  console.log(user)
  console.log('isVerifying: ' + isVerifying)
  console.log('isEmailVerified: ' + user.emailVerified)
  console.log('isAuthenticated: ' + isAuthenticated)
  // console.log(user.emailVerified)
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={ProfilePage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
        isEmailVerified={user.emailVerified}
      />
      <ProtectedRoute
        exact
        path="/profile/modify"
        component={ProfileModifyPage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
        isEmailVerified={user.EmailVerified}
      />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/login" component={Login} />
      <Route path="/verify-email" component={verifyEmailPage} />
    </Switch>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(App)
