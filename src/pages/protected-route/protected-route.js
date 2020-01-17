import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from '../../components/navbar/navbar.jsx'
import VerifyEmailPage from '../../pages/verify-email-page/verify-email-page.jsx'

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  isEmailVerified,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : // ) : !isEmailVerified && isEmailVerified !== undefined ? (
      //   <Redirect
      //     to={{
      //       pathname: '/verify-email',
      //       state: { from: props.location }
      //     }}
      //   />
      isAuthenticated && isEmailVerified ? (
        <>
          <Navbar />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{
            pathname: '/sign-up',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default ProtectedRoute
