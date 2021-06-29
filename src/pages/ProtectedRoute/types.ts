import { RouteProps } from 'react-router-dom'

export type Props = RouteProps & {
  component: React.ElementType
  isAuthenticated: boolean
  isVerifying: boolean
  isEmailVerified: boolean
}
