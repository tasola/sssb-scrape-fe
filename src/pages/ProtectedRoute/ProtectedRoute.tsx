import React from 'react'

import { Route, Redirect } from 'react-router-dom'
import Navbar from 'src/components/Navbar/Navbar'

import { Props } from './types'

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  isEmailVerified,
  ...rest
}: Props): JSX.Element => {
  return (
    <Route
      {...rest}
      render={(props): React.ReactNode =>
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
