import {R, H, gql} from 'common'

const resetReview = (_, $, {cache}) => {
  cache.writeData ({data: {review: {__typename: `review`, link: [], topic: [], prerequisites: [{
    strength: null,
    level: null,
    topic: null
  }]}}})
}

export default resetReview