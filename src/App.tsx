import React from 'react'

import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/LoginPage/LoginPage'
import SubscriptionModificationPage from './pages/SubscriptionModificationPage/SubscriptionModificationPage'
import SubscriptionsPage from './pages/SubscriptionsPage/SubscriptionsPage'
import AccountPage from 'src/pages/AccountPage/AccountPage'
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import verifyEmailPage from './pages/VerifyEmailPage/VerifyEmailPage'
import { RootState } from './redux/store/store'

import './App.css'

const App = (): JSX.Element => {
  const { user, isAuthenticated, isVerifying } = useSelector(
    (state: RootState) => state.auth
  )

  const authProps = {
    isAuthenticated,
    isVerifying,
    isEmailVerified: user.emailVerified,
  }

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={SubscriptionsPage}
        {...authProps}
      />
      <ProtectedRoute
        exact
        path="/subscription/modify"
        component={SubscriptionModificationPage}
        {...authProps}
      />
      <ProtectedRoute
        exact
        path="/account"
        component={AccountPage}
        {...authProps}
      />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/login" component={Login} />
      <Route path="/verify-email" component={verifyEmailPage} />
    </Switch>
  )
}

export default App
