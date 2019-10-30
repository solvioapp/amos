import {
  React, gql, useQuery, R, H, Link,
  Input, Icon
} from 'common'
import top from './top.sc'

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
    <div css={top}>
      {res.type && <div>TYPE: <Icon src='book' book/></div>}
      {res.name || res.title && (
        <a href={res.link || res.url_main || res.url_goodreads}>
          {res.name || res.title}
        </a>
      )}
      {/* {res.url_main && <a href={res.url_main}>Main</a>} */}
      {/* {res.url_goodreads && <a href={res.url_goodreads}>Goodreads</a>} */}
      {res.url_download_pdf && <a href={res.url_download_pdf}>PDF</a>}
      {res.url_download_epub && <a href={res.url_download_epub}>EPUB</a>}
      {res.url_download_mobi && <a href={res.url_download_mobi}>MOBI</a>}
      {/* {res.typeSpecific_authors && <div>{res.typeSpecific_authors}</div>} */}
      {/* {res.typeSpecific_goodreadsAvgRating && <div>{res.typeSpecific_goodreadsAvgRating}</div>} */}
      {/* {res.typeSpecific_goodreadsNoRatings && <div>noRatings: {res.typeSpecific_goodreadsNoRatings}</div>} */}
      {/* {res.typeSpecific_pages && <div>{res.typeSpecific_pages} p.</div>} */}
      {/* {res.typeSpecific_datePublished && <div>{res.typeSpecific_datePublished}</div>}
      {res.typeSpecific_isbn && <div>{res.typeSpecific_isbn}</div>}
      {res.typeSpecific_dewey && <div>{res.typeSpecific_dewey}</div>} */}
    </div>
  )

  return (
    <div>
      {H.isNotNilOrEmpty (data)
        ? H.map (renderResource) (R.sort ((res1, res2) => (
          res1.title
            ? -1
            : res1.typeSpecific_goodreadsNoRatings
              ? res2.typeSpecific_goodreadsNoRatings
                ? res2.typeSpecific_goodreadsNoRatings - res1.typeSpecific_goodreadsNoRatings
                : 1
              : -1
        )) (data.getTopResourcesByName))
        : null
      }
    </div>
  )
}

export default Topic