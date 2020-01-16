import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from '../../components/navbar/navbar.jsx'

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        <>
          {/* <Navbar /> */}
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
