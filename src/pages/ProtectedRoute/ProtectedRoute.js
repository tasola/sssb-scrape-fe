import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import Navbar from 'src/components/Navbar/Navbar'

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  isEmailVerified,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isVerifying ? (
          <div />
        ) : !isEmailVerified && isEmailVerified !== undefined ? (
          <Redirect
            to={{
              pathname: '/verify-email',
              state: { from: props.location },
            }}
          />
        ) : isAuthenticated ? (
          <>
            <Navbar />
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/sign-up',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
