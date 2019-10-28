import {
  H, React, gql, useQuery, useMutation, useQueryParam, StringParam,
} from 'common'

export const

AUTH_GITHUB_GQL = gql`
  query AuthGithub ($input: AuthGithubInput!) {
    authGithub (input: $input) {
      success
      message
      handleGithub @client
    }
  }
`,

SIGNUP_GITHUB_GQL = gql`
  mutation SignupGithub ($input: SignupGithubInput!) {
    signupGithub (input: $input) {
      success
      message
      login @client
    }
  }
`,

GITHUB = C => ({match, ...rest}) => {
  const

  [ghCode] = useQueryParam (`code`, StringParam),
  [] = [ghCode |> console.log ('ghCode', #)],
  {data} = useQuery (AUTH_GITHUB_GQL, {variables: {input: {ghCode}}}),
  [] = [data |> console.log ('data', #)],
  ghAccessToken = data?.authGithub?.handleGithub,
  skip = H.isNilOrEmpty (ghAccessToken),
  input = {ghAccessToken},
  [] = [input |> console.log ('input GITHUB', #)],
  signupGithub = useMutation (SIGNUP_GITHUB_GQL, {skip})

  return (
    <C onSubmit={signupGithub} {...{input}} {...rest}/>
  )
}