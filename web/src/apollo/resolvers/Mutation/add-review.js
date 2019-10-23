import {R, H} from 'common'

const addReview = (_, {input}, {cache}) => {
  input |> console.log ('input addReview Resolver', #)
  const _input = {topic: R.filter (H.isNotNilOrEmpty) (input.topic)}
  const review = {__typename: `review`, ..._input}
  // const review = input
  cache.data.data |> console.log ('cache.data.data', #)
  cache.writeData ({data: {review}})
  // const  test= cache.read
  console.log (`addReviewLinks returning`)
  // return {success: 5, __typename: `foo__typename`}
}

export default addReview