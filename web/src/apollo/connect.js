/* eslint-disable max-lines */
import {
  React, gql, useQuery, useLazyQuery, useMutation,
} from 'common'

export const

_GET_AUTH = gql`
  query {
    isAuthenticated @client
  }
`,

GET_AUTH = C => ({...rest}) => {
  const {data} = useQuery (_GET_AUTH)
  return (
    <C {...data} {...rest}/>
  )
},

_LOGIN = gql`
  query Login ($input: LoginInput!) {
    login (input: $input) {
      success
      message
      login @client
    }
  }
`,

LOGIN = C => ({...rest}) => {
  const login = useLazyQuery (_LOGIN)

  return (
    <C login={login} {...rest}/>
  )
},

_SIGNUP = gql`
  mutation Signup ($input: SignupInput!) {
    signup (input: $input) {
      success
      message
      login @client
    }
  }
`,

SIGNUP = C => ({...rest}) => {
  const signup = useMutation (_SIGNUP)

  return (
    <C signup={signup} {...rest}/>
  )
}