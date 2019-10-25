import {
  H, R, React, useMutation, gql, hooks,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const messages = [
  `Do you really wanna review?`
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

  const onCompleted = H.navto (`/review/thanks`)

  const [exec] = useMutation (ADD_REVIEW_GQL, {onCompleted})

  const submitReview = () => {
    const {link, topic, prerequisite} = review
    const _review = {
      links: link,
      topics: H.isNotNilOrEmpty (topic) && topic,
      prerequisites: H.isNotNilOrEmpty (prerequisite)
        && [{level: 0, strength: 0, topic: review.prerequisite[0]}]
    }
      |> R.filter (R.identity) (#)
    exec ({variables: {input: {..._review}}})
  }

  return <div css={Top_} columns='two' {...props}>
    <div css={Top_} columns='left'>
      <AmosChat callToAction={
        <>
        <Button onClick={H.navto (`/review`)}>
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
