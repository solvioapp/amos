import {React, gql, useLazyQuery} from 'common'

export const

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
}