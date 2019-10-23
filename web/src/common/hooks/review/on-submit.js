import {R, H, React, useMutation, gql} from 'common'

const

structure = {
  links: {
    next: `topics`
  }, topics: {
    previous: `links`,
    next: `prerequisites`,
    finish: true
  }, prerequisites: {
    previous: `topics`,
    finish: true
  }
},

ADD_REVIEW_CLIENT_GQL = gql`
  mutation AddReviewClient {
    addReview (input: $input) @client
  }
`,

/**
 * @description creates onSubmit
 */
onSubmit = (props) => {
  const

  /* Setup */
  {match} = props,
  page = R.pipe (R.prop (`url`), R.split (`/`), R.nth (2)) (match),

  /* Mutation */
  [exec] = useMutation (ADD_REVIEW_CLIENT_GQL),
  // exec = () => {},

  /* create onSubmit */
  obj = structure[page],
  previous = H.intercept (H.navto (`/review/${obj.previous}`)) (exec) |> R.of,
  next = H.intercept (H.navto (`/review/${obj.next}`)) (exec) |> R.of,
  finish = [H.navto (`/review/thanks`)],

  /* eslint-disable no-shadow */
  onSubmit = {previous, next, finish}
  return R.merge ({onSubmit}) (props)
}

export default onSubmit