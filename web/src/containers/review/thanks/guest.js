import {
  H, React, useCallback,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const goRoot = H.navto (`/review`)

const messages = [
  `Thanks for the review!`,
  `This is the last chance to get Reputation for this fantastic review by signing up. 🤟`,
]

const Guest = ({...rest}) => {
  const {submitReview} = useReviewCtx()

  const submitAndGo = useCallback(() => {
    submitReview()
    goRoot()
  }, [submitReview])

  return <Top_ columns='two' {...rest}>
    <Top_ columns='left'>
      <AmosChat callToAction={
        <Button primary onClick={submitAndGo}>
          Submit anonymously
        </Button>
      }>{messages}</AmosChat>
    </Top_>
    <AuthBox/>
  </Top_>
}

export default Guest
