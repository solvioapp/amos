/* eslint-disable max-lines */
import {
  React, gql, useQuery, useLazyQuery, useMutation,
} from 'common'

export const

GET_AUTH_GQL = gql`
  query {
    isAuthenticated @client
  }
`,

GET_AUTH = C => ({...rest}) => {
  const {data} = useQuery (GET_AUTH_GQL)
  return (
    <C {...data} {...rest}/>
  )
},

LOGIN_GQL = gql`
  query Login ($input: LoginInput!) {
    login (input: $input) {
      success
      message
      login @client
    }
  }
`,

LOGIN = C => ({...rest}) => {
  const login = useLazyQuery (LOGIN_GQL)

  return (
    <C login={login} onSubmit={login} {...rest}/>
  )
},

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
