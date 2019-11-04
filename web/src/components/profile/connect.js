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

const connect = C => ({...rest}) => {
  const

  {data} = useQuery (GET_AUTH),

  [logoutAux] = useMutation (LOGOUT),
  [,, removeCookie] = useCookies ([`auth`]),

  logout = () => {
    removeCookie (`auth`)
    logoutAux()
  },

  props = R.mergeAll ([data, R.objOf (`logout`) (logout), rest])

  return (
    <C {...props} />
  )
}

export default connect

// import {connect} from 'react-redux'
// import {logout} from 'store/auth/actions'

// const actions = {
//   logout,
// }

// export default connect(null, actions)
