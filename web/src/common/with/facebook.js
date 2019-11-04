import {React, R, gql, useMutation} from 'common'

export const

AUTH_FACEBOOK_GQL = gql`
  mutation AuthFacebook ($input: AuthFacebookInput!) {
    authFacebook (input: $input) {
      success
      message
      handleFacebook @client
    }
  }
`,

FACEBOOK = C => (props) => {
  const

  [authFacebook] = useMutation (AUTH_FACEBOOK_GQL),

  forwardProps = R.merge ({authFacebook}) (props)

  return <C {...forwardProps} />
}