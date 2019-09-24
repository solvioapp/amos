import React from 'react'
import Input from 'components/Input'
import {gql} from 'apollo-boost'
import {useQuery} from '@apollo/react-hooks'
import * as R from 'ramda'
import * as H from 'common/helpers'
import {Link} from 'react-router-dom'

const QUERY_TOPIC = gql`
  query GetResources ($name: String!) {
    Topic (name: $name) {
      getTopResources {
        name
        urls
      }
    }
  }
`

const Topic = ({match: {params: {name}}}) => {
  const {loading, error, data} = useQuery(QUERY_TOPIC, {variables: {name}})

  loading |> console.log('loading', #)
  error |> console.log('error', #)
  data |> console.log('data', #)

  const renderResource = (res, key) => (
    <Link to={res.urls[0]} key={key}>{res.name}</Link>
  )

  return (
    <div>
      {data
        ? H.mapIndexed (renderResource) (data.Topic[0].getTopResources)
        : null
      }
    </div>
  )
}

export default Topic