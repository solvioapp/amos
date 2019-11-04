import {
  React, Redirect, W
} from 'common'

const Home = ({isAuthenticated}) => (
  <>
    {isAuthenticated
      ? <Redirect to='/learn'/>
      : <Redirect to='/about'/>
    }
  </>
)

export default W.GET_AUTH (Home)
