import {
  React, gql, useQuery, R, H, Link,
  Input, Icon
} from 'common'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
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
  const {data} = useQuery (QUERY_TOPIC, {variables: {name}, returnPartialData: true})
  const variant = `Primary`
  const renderResource = (res, key) => {
    const icon = R.cond ([
      [R.equals (`BOOK`), R.always (`book`)],
      [R.equals (`ONLINE_COURSE`), R.always (`online_course`)],
      [R.equals (`LECTURE_NOTES`), R.always (`lecture_notes`)],
      [R.T, R.always (null)]
    ]) (res.type)
    const link = res.link || res.url_main || res.url_goodreads
    const title = res.name || res.title
    return <div css={top} key={key}>
      {icon && <div>TYPE: <Icon src={icon} book/></div>}
      {title && (
        <a href={link}>
          <h2>{title}</h2>
        </a>
      )}

      {/* {res.url_main && <a href={res.url_main}>Main</a>} */}
      {/* {res.url_goodreads && <a href={res.url_goodreads}>Goodreads</a>} */}

      <ButtonToolbar>
        <SplitButton
          title={variant}
          variant={variant.toLowerCase()}
          id={`dropdown-split-variants-${variant}`}
          key={variant}
        >
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3" active>
            Active Item
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </SplitButton>
      </ButtonToolbar>

      {res.url_download_pdf && <a href={res.url_download_pdf}>PDF</a>}
      {res.url_download_epub && <a href={res.url_download_epub}>EPUB</a>}
      {res.url_download_mobi && <a href={res.url_download_mobi}>MOBI</a>}
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