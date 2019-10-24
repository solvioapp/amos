import {R, H, useQuery, gql} from 'common'

const

GET_REVIEW_CLIENT_GQL = gql`
  query {
    review @client {
      link
      topic
      prerequisite
    }
  }
`,

/* eslint-disable indent */
/**
 * @description Hydrates inputs on mount
 */
loadReview = (props) => {

  const

  onCompleted = ({review}) => {
    review |> console.log ('review loadReview', #)
    review?.link || props.match.url === `/review/links` || H.navto (`/review`) ()
  },

  // TODO: Change to false
  {data: {review}} = useQuery (GET_REVIEW_CLIENT_GQL, {returnPartialData: true, onCompleted})

  return R.merge ({review}) (props)
}

export default loadReview