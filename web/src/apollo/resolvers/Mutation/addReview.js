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

  input |> console.log ('input addReview', #)
  // TODO: Hacky
  let previous
  try {
    previous = cache.readQuery ({query: GET_REVIEW_CLIENT_GQL, returnPartialData: true})
  }
  catch (e) {
    previous = {}
  }
  const name = R.keys (input) [0]
  let _input
  if (name === `prerequisite`) {
    const prerequisite = (
      /* Filter invalid fields */
      H.reduce ((acc, obj, key) => (
        /* Check if all fields are valid */
        H.reduce ((acc, field) => acc && H.isNotNilOrEmpty (field)) (true) (obj)
          ? R.append ({__typename: `prerequisite[${key}]`, ...obj}) (acc)
          : acc
      )) ([]) (input[name])
    )
    _input = {prerequisite}
  }
  else {
    _input = {[name]: R.filter (H.isNotNilOrEmpty) (input[name])}
  }
  const review = {__typename: `review`, ..._input, ...previous}
  review |> console.log ('review addReview', #)
  cache.writeData ({data: {review}})
}

export default addReview