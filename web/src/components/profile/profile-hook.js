import {
  React, H, R, useCookies, gql, useQuery, useMutation
} from 'common'

const GET_AUTH = gql`
  query {
    isAuthenticated @client
  }
`

const LOGOUT = gql`
  mutation {
    logout @client
  }
`

const profileHook = (props) => {
  const

  {data} = useQuery (GET_AUTH),

  [logoutAux] = useMutation (LOGOUT),
  [,, removeCookie] = useCookies ([`auth`]),

  logout = () => {
    removeCookie (`auth`)
    logoutAux()
  }

  return {...props, data, logout}
}

export default profileHook