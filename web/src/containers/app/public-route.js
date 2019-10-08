import {
  React, Redirect, Route, con
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

export default con.GET_AUTH (PublicRoute)
