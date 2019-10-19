import {
  React, Redirect, Route, hooks, H
} from 'common'

const PrivateRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <C {...props}/> : <Redirect to={H.redirect (props)}/>
  )}/>
)

export default hooks.GET_AUTH (PrivateRoute)
