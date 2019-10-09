import {
  React, Redirect, Route, redirect, connect
} from 'common'

const PrivateRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <C {...props}/> : <Redirect to={redirect (props)}/>
  )}/>
)

export default connect.GET_AUTH (PrivateRoute)
