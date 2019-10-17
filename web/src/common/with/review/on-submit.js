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
addOnSubmit = C => (props) => {
  const

  /* Setup */
  {match} = props,
  page = R.pipe (R.prop (`url`), R.split (`/`), R.nth (2)) (match),

  /* Mutation */
  [exec] = useMutation (ADD_REVIEW_CLIENT_GQL),

  /* create onSubmit */
  obj = structure[page],
  previous = H.intercept (H.navto (`/review/${obj.previous}`)) (exec) |> R.of,
  next = H.intercept (H.navto (`/review/${obj.next}`)) (exec) |> R.of,
  finish = [H.navto (`/review/thanks`)],

  onSubmit = {previous, next, finish},
  forwardProps = R.merge ({onSubmit}) (props)

  return <C {...forwardProps} />
}

export default addOnSubmit