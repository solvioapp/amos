import {
  H, React, useCallback,
  AmosChat, Button
} from 'common'
import Top_ from '../top.sc'

const goLinks = H.navto (`/review/links`)

const messages = [
  () => <span>
    Thank you 🙂️ Smarter every day!<br/>I'll let you know if you get Rep for that review ✌️
  </span>,
]

const Authorized = ({...rest}) => {
  const {submitReview} = useReviewCtx()

  const submitAndGo = useCallback(() => {
    submitReview()
    goLinks()
  }, [submitReview])

  return (
    <Top_ {...rest}>
      <AmosChat callToAction={
        <Button primary onClick={submitAndGo}>
          Submit another Review
        </Button>
      }>
        {messages}
      </AmosChat>
    </Top_>
  )
}

export default Authorized
