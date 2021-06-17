import React from 'react'

import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/LoginPage/LoginPage'
import ProfileModifyPage from './pages/ProfileModifyPage/ProfileModifyPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import verifyEmailPage from './pages/VerifyEmailPage/VerifyEmailPage'

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
