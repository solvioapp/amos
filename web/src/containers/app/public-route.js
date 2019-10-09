import {
  React, Redirect, Route, redirect, connect
} from 'common'

const PublicRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <Redirect to={redirect (props)}/> : <C {...props}/>
  )}/>
)

export default connect.GET_AUTH (PublicRoute)
