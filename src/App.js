import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import ProtectedRoute from './pages/protected-route/protected-route'
import Home from './pages/home-page/home-page'
import SignUpPage from './pages/sign-up-page/sign-up-page'
import Login from './pages/login-page/login-page'

function App(props) {
  const { isAuthenticated, isVerifying } = props
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
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
