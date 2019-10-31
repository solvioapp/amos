import {
  React, gql, useQuery, R, H, Link,
  Input, Icon
} from 'common'
import top from './top.sc'

const DOWNLOAD_DOMAIN = `http://93.174.95.29/main`

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
  const {data} = useQuery (QUERY_TOPIC, {variables: {name}, returnPartialData: true})
  const renderResource = (res, key) => {
    const icon = R.cond ([
      [R.equals (`BOOK`), R.always (`book`)],
      [R.equals (`ONLINE_COURSE`), R.always (`online_course`)],
      [R.equals (`LECTURE_NOTES`), R.always (`lecture_notes`)],
      [R.T, R.always (null)]
    ]) (res.type)
    const link = res.link || res.url_main || res.url_goodreads
    const title = res.name || res.title
    const download = res.url_download_pdf || res.url_download_epub || res.url_download_mobi
    return <div css={top} key={key}>
      {icon && <div>TYPE: <Icon src={icon} book/></div>}
      {title && (
        <a target='_blank' href={link}>
          <h3><i>{title}</i></h3>
        </a>
      )}      
      {download &&
        <>
        <p>View:</p>
        <ul>
          {res.url_download_pdf &&
            <li>
              <a target='_blank' href={`${DOWNLOAD_DOMAIN}${res.url_download_pdf}`}>
                PDF
              </a>
            </li>
          }
          {res.url_download_epub &&
            <li>
              <a target='_blank' href={`${DOWNLOAD_DOMAIN}${res.url_download_epub}`}>
                EPUB
              </a>
            </li>
          }
          {res.url_download_mobi &&
            <li>
              <a target='_blank' href={`${DOWNLOAD_DOMAIN}${res.url_download_mobi}`}>
                MOBI
              </a>
            </li>
          }
        </ul>
        </>
      }
      {res.typeSpecific_authors && <div>By {res.typeSpecific_authors}</div>}
      {res.typeSpecific_datePublished && <div>published in {res.typeSpecific_datePublished}</div>}
      {res.typeSpecific_goodreadsAvgRating && <div>Avg. rating: {res.typeSpecific_goodreadsAvgRating}</div>}
      {res.typeSpecific_goodreadsNoRatings && <div># of ratings: {res.typeSpecific_goodreadsNoRatings}</div>}
      {res.typeSpecific_pages && <div>{res.typeSpecific_pages} p.</div>}
      {res.typeSpecific_isbn && <div>ISBN: {res.typeSpecific_isbn}</div>}
      {/* {res.typeSpecific_dewey && <div>{res.typeSpecific_dewey}</div>}} */}
    </div>
  }

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