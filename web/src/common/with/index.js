import {R, H, React, gql, useQuery, useMutation} from 'common'

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
  mutation AuthFacebook ($input: AuthFacebookInput!) {
    authFacebook (input: $input) {
      success
      message
      saveFbAccessToken @client
    }
  }
`,

FACEBOOK = C => (props) => {
  const

  onCompleted = ({authFacebook: {success}}) => {
    success && H.navto (`/signup/username`) ()
  },

  [authFacebook, {data}] = useMutation (AUTH_FACEBOOK_GQL, {onCompleted}),

  forwardProps = R.merge ({authFacebook, data}) (props)

  return <C {...forwardProps} />
}