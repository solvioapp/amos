import {
  H, React, gql, useQuery, useMutation, useQueryParam, NumberParam,
} from 'common'

export const

AUTH_GITHUB = gql`
  query AuthGithub ($input: AuthGithubInput!) {
    authGithub (input: $input) {
      success
      messsage
    }
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

GITHUB = C => ({...rest}) => {
  const

  [code] = useQueryParam (`code`, NumberParam),
  
  {data} = useQuery (AUTH_GITHUB, {variables: {input: {code}}}),

  skip = H.isNilOrEmpty (fbAccessToken),
  input = {fbAccessToken},
  signupFacebook = useMutation (SIGNUP_FACEBOOK_GQL, {skip})

  return (
    <C onSubmit={signupFacebook} {...{input}} {...rest}/>
  )
}