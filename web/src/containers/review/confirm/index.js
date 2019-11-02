import {
  H, R, React, useMutation, gql, hooks, W,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const ADD_REVIEW_GQL = gql`
  mutation AddReview ($input: AddReviewInput!) {
    addReview (input: $input) {
      success
      message
    }
  }
`,

RESET_REVIEW_GQL = gql`
  mutation ResetReview {
    resetReview @client
  }
`,

createTopics = R.cond ([
  [H.hasLength (1), R.identity],
  [H.hasLength (2), topics => (
    <span>
      {topics[0]} and {topics[1]}
    </span>
  )],
  [R.T, topics => (
    <span>{H.safeMap (t => <span>{t}, </span>) (R.dropLast (2) (topics))} {R.nth (R.length (topics) - 2) (topics)} and {R.last (topics)}
    </span>
  )]
]),

Confirm = (props) => {

  const {review} = hooks.loadReview (props),
  {link, topic, prerequisite} = review,
  url = link?.[0],

  messages = [
    `Do you really wanna submit the following review?`,
    <a href={url}>{url}</a>,
    ... H.isNotNilOrEmpty (topic) ? ([
      <span>Resource is on {createTopics (topic)}.</span>
    ]) : [],
    ... H.isNotNilOrEmpty (prerequisite) ? ([
      <span>Resource has prerequisites {createTopics (R.pluck (`topic`) (prerequisite))}.</span>
    ]) : []
  ],

  [resetReview] = useMutation (RESET_REVIEW_GQL),

  onCompleted = () => {
    resetReview()
    H.navto (`/review/thanks`)()
  },

  [exec] = useMutation (ADD_REVIEW_GQL, {onCompleted}),

  submitReview = () => {
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
  },

  amosChat = (
    <AmosChat callToAction={
      <>
      <Button onClick={H.navto (`/review/links`)}>
        Edit review
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
