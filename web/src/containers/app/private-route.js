import {
  React, Redirect, Route, connect
} from 'common'

const destUrl = props => ({
  pathname: `/`,
  state: {from: props.location.pathname}
})

const PrivateRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <C {...props}/> : <Redirect to={destUrl (props)}/>
  )}/>
)

export default connect.GET_AUTH (PrivateRoute)
