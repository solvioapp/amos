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
    <div style={{width: `500px`}}>
      {res.type && <div>{res.type}</div>}
      {res.name && <div>{res.name}</div>}
      {res.link && <div>{res.link}</div>}
      {res.title && <div>{res.title}</div>}
      {res.url_main && <a href={res.url_main}>Main</a>}
      {res.url_goodreads && <a href={res.url_goodreads}>Goodreads</a>}
      {res.url_download_pdf && <a href={res.url_download_pdf}>PDF</a>}
      {res.url_download_epub && <a href={res.url_download_epub}>EPUB</a>}
      {res.url_download_mobi && <a href={res.url_download_mobi}>MOBI</a>}
      {res.typeSpecific_authors && <div>{res.typeSpecific_authors}</div>}
      {res.typeSpecific_goodreadsAvgRating && <div>{res.typeSpecific_goodreadsAvgRating}</div>}
      {res.typeSpecific_goodreadsNoRatings && <div>{res.typeSpecific_goodreadsNoRatings}</div>}
      {res.typeSpecific_pages && <div>{res.typeSpecific_pages}</div>}
      {res.typeSpecific_datePublished && <div>{res.typeSpecific_datePublished}</div>}
      {res.typeSpecific_isbn && <div>{res.typeSpecific_isbn}</div>}
      {res.typeSpecific_dewey && <div>{res.typeSpecific_dewey}</div>}
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