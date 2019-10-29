import {R, H, gql} from 'common'

const addReview = (_, {input}, {cache}) => {
  const GET_REVIEW_CLIENT_GQL = gql`
    query {
      review @client {
        link
        topic
        prerequisite
      }
    }
  `

  // TODO: Hacky
  let previous
  try {
    previous = cache.readQuery ({query: GET_REVIEW_CLIENT_GQL, returnPartialData: true})
  }
  catch (e) {
    previous = {}
  }
  const name = R.keys (input) [0]
  const _input = {[name]: R.filter (H.isNotNilOrEmpty) (input[name])}
  const review = {__typename: `review`, ..._input, ...previous}
  cache.writeData ({data: {review}})
}

export default addReview