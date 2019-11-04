import {
  React, gql, useQuery, R, H, Link, CONST,
  Icon, AmosChat, SplitButton, Topics, Prerequisites
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
      topics {
        names
      }
      prerequisites {
        level
        strength
        topic {
          names
        }
      }
    }
  }
`

const onMenuClick = (e, {item: {url}}) => {
  window.location.href = `${CONST.DOWNLOAD_DOMAIN}${url}`
}

const Topic = ({location, match}) => {
  location |> console.log ('location', #)
  match |> console.log ('match', #)
  const name = match.params.name
  const options = {
    variables: {name},
    returnPartialData: true,
    fetchPolicy: `cache-and-network`
  }
  const {data} = useQuery (QUERY_TOPIC, options)
  const renderResource = (res, key) => {
    res |> console.log ('res', #)
    const icon = R.cond ([
      [R.equals (`BOOK`), R.always (`book`)],
      [R.equals (`ONLINE_COURSE`), R.always (`online_course`)],
      [R.equals (`LECTURE_NOTES`), R.always (`lecture_notes`)],
      [R.T, R.always (null)]
    ]) (res.type)
    const link = res.link || res.url_main || res.url_goodreads
    const title = res.name || res.title
    const downloads = [res.url_download_pdf, res.url_download_epub, res.url_download_mobi]
    const strings = [`PDF`, `EPUB`, `MOBI`]
    const download = R.reduce ((acc, val) => acc || val) (false) (downloads)
    
    const items = H.reduce ((acc, val, _key) => (
      val ? R.append ({label: strings[_key], url: val}) (acc) : acc
    )) ([]) (downloads)
    const onClick = () => window.location.href = `${CONST.DOWNLOAD_DOMAIN}${items?.[0]?.url}`
    const {topics, prerequisites} = res
    return <div css={top} key={key}>
      {icon && <div>TYPE: <Icon src={icon} book/></div>}
      {title && (
        <a target='_blank' href={link}>
          <h3><i>{title}</i></h3>
        </a>
      )}
      {download &&
        <SplitButton {...{items, onClick, onMenuClick}}>
          View
        </SplitButton>
      }
      {res.typeSpecific_authors && <p>By {res.typeSpecific_authors}</p>}
      {res.typeSpecific_datePublished && <p>published in {res.typeSpecific_datePublished}</p>}
      {res.typeSpecific_goodreadsAvgRating && <p>Avg. rating: {res.typeSpecific_goodreadsAvgRating}</p>}
      {res.typeSpecific_goodreadsNoRatings && <p># of ratings: {res.typeSpecific_goodreadsNoRatings}</p>}
      {res.typeSpecific_pages && <p>{res.typeSpecific_pages} p.</p>}
      {res.typeSpecific_isbn && <p>ISBN: {res.typeSpecific_isbn}</p>}
      {H.isNotNilOrEmpty (topics) && <p>The topics are <Topics topics={R.pluck (`names`) (topics)}/>.</p>}
      {H.isNotNilOrEmpty (prerequisites) && <p>People told me they <Prerequisites {...{prerequisites}}/>.</p>}
      {/* {res.typeSpecific_dewey && <p>{res.typeSpecific_dewey}</p>}} */}
    </div>
  }

  const message = [
    <span>Great! Here are some resources for {name}. Help me expand my collection by submitting a <Link to='/review'>Review</Link>.</span>
  ]

  return (
    <div>
      <AmosChat>
        {message}
      </AmosChat>
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