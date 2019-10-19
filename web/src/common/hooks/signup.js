import {React, gql, useMutation} from 'common'

export const

SIGNUP_GQL = gql`
  mutation Signup ($input: SignupInput!) {
    signup (input: $input) {
      success
      message
      login @client
    }
  }
`,

SIGNUP = C => ({...rest}) => {
  const signup = useMutation (SIGNUP_GQL)

  return (
    <C signup={signup} onSubmit={signup} {...rest}/>
  )
}