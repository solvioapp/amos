import {
  React, Redirect, W
} from 'common'

const Home = ({isAuthenticated}) => (
  <>
    {isAuthenticated
      ? <Redirect to='/search'/>
      : <Redirect to='/about'/>
    }
  </>
)

export default W.GET_AUTH (Home)
