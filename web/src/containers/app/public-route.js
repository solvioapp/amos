import {
  React, Redirect, Route, H, hooks,
} from 'common'

const PublicRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <Redirect to={H.redirect (props)}/> : <C {...props}/>
  )}/>
)

export default hooks.GET_AUTH (PublicRoute)
