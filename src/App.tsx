import React from 'react'

import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/LoginPage/LoginPage'
import SubscriptionModificationPage from './pages/SubscriptionModificationPage/SubscriptionModificationPage'
import SubscriptionsPage from './pages/SubscriptionsPage/SubscriptionsPage'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import verifyEmailPage from './pages/VerifyEmailPage/VerifyEmailPage'
import { RootState } from './redux/store/store'

import './App.css'

const App = (): JSX.Element => {
  const { user, isAuthenticated, isVerifying } = useSelector(
    (state: RootState) => state.auth
  )

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={SubscriptionsPage}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
        isEmailVerified={user.emailVerified}
      />
      <ProtectedRoute
        exact
        path="/subscription/modify"
        component={SubscriptionModificationPage}
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

export default App
