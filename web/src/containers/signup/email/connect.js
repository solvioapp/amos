import {React, gql, useQuery} from 'common'
// import {connect} from 'react-redux'
// import {setIsAuth} from 'store/auth/actions'

// const actions = {
//   login: () => setIsAuth(true),
// }

// export default connect(null, actions)

const GET_AUTH = gql`
  {
    isAuthenticated @client
  }
`


const connect = C => () => {
  const {data, client} = useQuery (GET_AUTH)
  data |> console.log ('data', #)
  return <C/>
}


export default connect