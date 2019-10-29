import {R, H, React, gql, useQuery, useLazyQuery} from 'common'

export const

GET_AUTH_GQL = gql`
  {
    isAuthenticated @client
  }
`,

GET_AUTH = C => ({...rest}) => {
  const {data} = useQuery (GET_AUTH_GQL)
  return (
    <C {...data} {...rest}/>
  )
},

AUTH_FACEBOOK_GQL = gql`
  query AuthFacebook ($input: AuthFacebookInput!) {
    authFacebook (input: $input) {
      success
      message
      handleFacebook @client
    }
  }
`,

FACEBOOK = C => (props) => {
  const

  [_authFacebook] = useLazyQuery (AUTH_FACEBOOK_GQL),

  authFacebook = (...args) => {
    args |> console.log ('args', #)
    return _authFacebook (...args)
  },

  forwardProps = R.merge ({authFacebook}) (props)

  return <C {...forwardProps} />
}