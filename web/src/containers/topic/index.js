import {
  React, gql, useQuery, R, H, Link,
  Input
} from 'common'

const QUERY_TOPIC = gql`
  query GetResources ($name: String!) {
    getTopResourcesByName (name: $name) {
      name
      type
    }
  }
`

const Topic = ({match: {params: {name}}}) => {
  name |> console.log ('name', #)
  const {loading, error, data} = useQuery (QUERY_TOPIC, {variables: {name}})

  loading |> console.log('loading', #)
  error |> console.log('error', #)
  data |> console.log('data', #)

  // <a href={res.urls} key={key}>{res.name}</a>
  // <p>{res.url_main}</p>
  // <p>{res.url_goodreads}</p>
  // <p>{res.url_download_pdf}</p>
  // <p>{res.url_download_epub}</p>
  // <p>{res.url_download_mobi}</p>
  // <p>{res.typeSpecific_authors}</p>
  // <p>{res.typeSpecific_goodreadsAvgRating}</p>
  // <p>{res.typeSpecific_goodreadsNoRatings}</p>
  // <p>{res.typeSpecific_pages}</p>
  // <p>{res.typeSpecific_datePublished}</p>
  // <p>{res.typeSpecific_isbn}</p>
  // <p>{res.typeSpecific_dewey}</p>
  const renderResource = (res, key) => (
    <div>
      <p>{res.type}</p>
      <p>{res.name}</p>
      <hr/>
    </div>
  )

  return (
    <div>
      {data
        ? H.map (renderResource) (data.getTopResourcesByName)
        : null
      }
    </div>
  )
}

export default Topic