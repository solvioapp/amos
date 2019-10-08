import {React, H, R, useCookies, gql, useQuery} from 'common'
// import {connect} from 'react-redux'
// import {setIsAuth} from 'store/auth/actions'

// const actions = {
//   login: () => setIsAuth(true),
// }

// export default connect(null, actions)

const GET_AUTH = gql`
  query {
    isAuthenticated @client
  }
`

const connect = C => ({...rest}) => {
  const

  {data, client} = useQuery (GET_AUTH)
  data  |> console.log ('data connectApp', #)
  const [cookies] = useCookies ([`auth`]),
  auth = R.prop (`auth`) (cookies)
  auth |> console.log ('auth', #)
  H.isNotNilOrEmpty (auth) && (() => {
    client.writeData ({data: {isAuthenticated: true}})
  })()

  return (
    <C {...data} {...rest}/>
  )
}

export default connect
