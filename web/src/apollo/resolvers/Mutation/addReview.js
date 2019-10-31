import {R, H, gql} from 'common'

const addReview = (_, {input}, {cache}) => {
  const GET_REVIEW_CLIENT_GQL = gql`
    query {
      review @client {
        link
        topic
        prerequisite {
          strength
          level
          topic
        }
      }
    }
  `

  // TODO: Hacky
  let previous
  try {
    const {review} = cache.readQuery ({query: GET_REVIEW_CLIENT_GQL, returnPartialData: true})
    previous = review
  }
  catch (e) {
    previous = {}
  }
  const name = R.keys (input) [0]
  let _input
  if (name === `prerequisite`) {
    input |> console.log ('addReview input', #)
    const prerequisite = (
      /* Filter invalid fields */
      H.reduce ((acc, obj, key) => (
        /* Check if all fields are valid */
        H.reduce ((_acc, field) => _acc && H.isNotNilOrEmpty (field)) (true) (R.values (obj))
          ? R.append ({__typename: `Prerequisite`, ...obj}) (acc)
          : acc
      )) ([]) (input[name])
    )
    prerequisite |> console.log ('addReview prerequisite', #)
    _input = {prerequisite}
  }
  else {
    _input = {[name]: R.filter (H.isNotNilOrEmpty) (input[name])}
  }
  previous |> console.log ('addReview previous', #)
  const review = {__typename: `Review`, ...previous, ..._input}
  review |> console.log ('addReview review', #)
  cache.writeData ({data: {review}})
}

export default addReview