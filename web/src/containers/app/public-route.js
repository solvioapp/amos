import {
  React, Redirect, Route, connect
} from 'common'

const destUrl = props => ({
  pathname: `/`,
  state: {from: props.location.pathname}
})

const PublicRoute = ({isAuthenticated: auth, component: C, ...rest}) => (
  <Route {...rest} render={props => (
    auth ? <Redirect to={destUrl (props)}/> : <C {...props}/>
  )}/>
)

export default connect.GET_AUTH (PublicRoute)
