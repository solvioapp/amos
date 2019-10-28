import {
  React, gql, useQuery, R, H, Link,
  Input
} from 'common'

const QUERY_TOPIC = gql`
  query GetResources ($name: String!) {
    getTopResourcesByName (name: $name) {
      type
      url_main
      url_goodreads
      url_download_pdf
      url_download_epub
      url_download_mobi
      typeSpecific_authors
      typeSpecific_goodreadsAvgRating
      typeSpecific_goodreadsNoRatings
      typeSpecific_pages
      typeSpecific_datePublished
      typeSpecific_isbn
      typeSpecific_dewey
      name
      title
      link
    }
  }
`

const Topic = ({match: {params: {name}}}) => {
  name |> console.log ('name', #)
  const {loading, error, data} = useQuery (QUERY_TOPIC, {variables: {name}, returnPartialData: true})

  loading |> console.log('loading', #)
  error |> console.log('error', #)
  data |> console.log('data', #)

  const renderResource = (res, key) => (
    <div>
      {res.type && <p>{res.type}</p>}
      {res.name && <p>{res.name}</p>}
      {res.link && <p>{res.link}</p>}
      {res.title && <p>{res.title}</p>}
      {res.urls && <a href={res.urls} key={key}>{res.name}</a>}
      {res.url_main && <p>{res.url_main}</p>}
      {res.url_goodreads && <p>{res.url_goodreads}</p>}
      {res.url_download_pdf && <p>{res.url_download_pdf}</p>}
      {res.url_download_epub && <p>{res.url_download_epub}</p>}
      {res.url_download_mobi && <p>{res.url_download_mobi}</p>}
      {res.typeSpecific_authors && <p>{res.typeSpecific_authors}</p>}
      {res.typeSpecific_goodreadsAvgRating && <p>{res.typeSpecific_goodreadsAvgRating}</p>}
      {res.typeSpecific_goodreadsNoRatings && <p>{res.typeSpecific_goodreadsNoRatings}</p>}
      {res.typeSpecific_pages && <p>{res.typeSpecific_pages}</p>}
      {res.typeSpecific_datePublished && <p>{res.typeSpecific_datePublished}</p>}
      {res.typeSpecific_isbn && <p>{res.typeSpecific_isbn}</p>}
      {res.typeSpecific_dewey && <p>{res.typeSpecific_dewey}</p>}
      <hr/>
    </div>
  )

  return (
    <div>
      {H.isNotNilOrEmpty (data)
        ? H.map (renderResource) (data.getTopResourcesByName)
        : null
      }
    </div>
  )
}

export default Topic