import {React, gql, useQuery} from 'common'

export const

GET_AUTH = C => ({...rest}) => {
  const {data} = useQuery (gql`
    query {
      isAuthenticated @client
    }
  `)
  return (
    <C {...data} {...rest}/>
  )
}