import {H, React, gql, useQuery, useMutation} from 'common'

export const

GET_FB_ACCESS_TOKEN = gql`
  {
    fbAccessToken @client
  }
`,

SIGNUP_FACEBOOK_GQL = gql`
  mutation SignupFacebook ($input: SignupFacebookInput!) {
    signupFacebook (input: $input) {
      success
      message
      login @client
    }
  }
`,

FACEBOOK = C => ({...rest}) => {
  const

  {data} = useQuery (GET_FB_ACCESS_TOKEN),
  fbAccessToken = data?.fbAccessToken,
  skip = H.isNilOrEmpty (fbAccessToken),
  input = {fbAccessToken},
  signupFacebook = useMutation (SIGNUP_FACEBOOK_GQL, {skip})

  return (
    <C onSubmit={signupFacebook} {...{input}} {...rest}/>
  )
}