import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import ProtectedRoute from './pages/protected-route/protected-route'
import ProfilePage from './pages/profile-page/profile-page.jsx'
import SignUpPage from './pages/sign-up-page/sign-up-page.jsx'
import Login from './pages/login-page/login-page'
import ProfileModifyPage from './pages/profile-modify-page/profile-modify-page.jsx'

function App(props) {
  const { isAuthenticated, isVerifying } = props
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={ProfilePage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/profile/modify"
        component={ProfileModifyPage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/login" component={Login} />
    </Switch>
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  }
}

export default connect(mapStateToProps)(App)
