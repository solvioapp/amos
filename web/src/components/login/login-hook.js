import {gql, useLazyQuery} from 'common'

const

LOGIN_GQL = gql`
  query Login ($input: LoginInput!) {
    login (input: $input) {
      success
      message
      login @client
    }
  }
`,

loginHook = () => {
  const login = useLazyQuery (LOGIN_GQL)

  return {login}
}

export default loginHook