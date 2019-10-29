import {R, H, gql} from 'common'

const resetReview = (_, $, {cache}) => {
  console.log (`resetting review`)
  cache.writeData ({data: {review: {__typename: `review`, link: [], topic: [], prerequisites: []}}})
}

export default resetReview