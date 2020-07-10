import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import ProtectedRoute from './pages/protected-route/protected-route'
import ProfilePage from './pages/profile-page/profile-page.jsx'
import MyAccountPage from './pages/my-account-page/my-account-page'
import SignUpPage from './pages/sign-up-page/sign-up-page.jsx'
import Login from './pages/login-page/login-page'
import ProfileModifyPage from './pages/profile-modify-page/profile-modify-page.jsx'
import verifyEmailPage from './pages/verify-email-page/verify-email-page'

import './App.css'

const App = (props) => {
  const { isAuthenticated, isVerifying, user } = props
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
      <ProtectedRoute
        exact
        path="/my-account"
        component={MyAccountPage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
        isEmailVerified={user.emailVerified}
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
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(App)
