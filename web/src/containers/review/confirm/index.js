import {
  H, R, React, useMutation, gql, hooks, W,
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
      prerequisites: H.isNotNilOrEmpty (prerequisite) && do {
        R.map (p => ({
          strength: parseInt (p.strength, 10),
          level: parseInt (p.level, 10),
          topic: p.topic
        })) (prerequisite)
      }
    }
      |> R.filter (R.identity) (#)
    exec ({variables: {input: {..._review}}})
  }

  const amosChat = (
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
  )

  return props.isAuthenticated
    ? (
      <div css={Top_} {...props}>
        {amosChat}
      </div>
    )
    : (
      <div css={Top_} columns='two' {...props}>
        <div css={Top_} columns='left'>
          {amosChat}
        </div>
        <AuthBox/>
      </div>
    )
}

export default W.GET_AUTH (Confirm)
