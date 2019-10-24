import {
  H, R, React, useQuery, useMutation, gql, hooks,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const messages = [
  `Thanks for the review!`,
  `This is the last chance to get Reputation for this fantastic review by signing up. 🤟`,
],

ADD_REVIEW_GQL = gql`
  mutation AddReview ($input: AddReviewInput!) {
    addReview (input: $input) {
      success
      message
    }
  }
`,

Confirm = (props) => {

  const {review} = hooks.loadReview (props)

  review |> console.log ('review Confirm', #)
  
  const onCompleted = () => {}

  const [exec] = useMutation (ADD_REVIEW_GQL, {onCompleted})

  const submitReview = () => {
    const _review = {
      links: review.link,
      topics: review.topic,
      prerequisites: [{level: 0, strength: 0, topic: review.prerequisite[0]}]
    }
      |> R.filter (R.identity) (#)
    exec ({variables: {input: {..._review}}})
  }

  return <div css={Top_} columns='two' {...props}>
    <div css={Top_} columns='left'>
      <AmosChat callToAction={
        <>
        <Button onClick={H.navto (`/`)}>
          Cancel
        </Button>
        <Button primary onClick={submitReview}>
          Submit!
        </Button>
        </>
      }>{messages}</AmosChat>
    </div>
    <AuthBox/>
  </div>
}

export default Confirm
