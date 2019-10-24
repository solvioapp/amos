import {R, H, gql} from 'common'

const addReview = (_, {input}, {cache}) => {
  input |> console.log ('addReview input', #)
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
  } catch (e) {
    previous = {}
  }
  // input |> console.log ('input addReview Resolver', #)
  previous |> console.log ('previous', #)
  const name = R.keys (input) [0]
  const _input = {[name]: R.filter (H.isNotNilOrEmpty) (input[name])}
  const review = {__typename: `review`, ..._input, ...previous}
  // const review = input
  // cache.data.data |> console.log ('cache.data.data', #)
  cache.writeData ({data: {review}})
  // const  test= cache.read
  // console.log (`addReviewLinks returning`)
  // return {success: 5, __typename: `foo__typename`}
}

export default addReview