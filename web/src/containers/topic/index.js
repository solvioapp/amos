import {
  React, gql, useQuery, R, H, Link,
  Input
} from 'common'

const QUERY_TOPIC = gql`
  query GetResources ($name: String!) {
    Topic (name: $name) {
      getTopResources {
        type
        name
      }
    }
  }
`

const Topic = ({match: {params: {name}}}) => {
  name |> console.log ('name', #)
  const {loading, error, data} = useQuery (QUERY_TOPIC, {variables: {name}})

  loading |> console.log('loading', #)
  error |> console.log('error', #)
  data |> console.log('data', #)

  const renderResource = (res, key) => (
    <div>
      <a href={res.urls} key={key}>{res.name}</a>
      <p>{res.type}</p>
      <p>{res.url_main}</p>
      <p>{res.url_goodreads}</p>
      <p>{res.url_download_pdf}</p>
      <p>{res.url_download_epub}</p>
      <p>{res.url_download_mobi}</p>
      <p>{res.typeSpecific_authors}</p>
      <p>{res.typeSpecific_goodreadsAvgRating}</p>
      <p>{res.typeSpecific_goodreadsNoRatings}</p>
      <p>{res.typeSpecific_pages}</p>
      <p>{res.typeSpecific_datePublished}</p>
      <p>{res.typeSpecific_isbn}</p>
      <p>{res.typeSpecific_dewey}</p>
      <p>{res.name}</p>
    </div>
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