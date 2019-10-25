import {
  H, React, useCallback,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const goRoot = H.navto (`/review`)

const messages = [
  `Thanks for the review!`,
]

const Guest = ({...rest}) => {
  // const {submitReview} = useReviewCtx()

  // const submitAndGo = useCallback(() => {
  //   submitReview()
  //   goRoot()
  // }, [submitReview])

  return <div css={Top_} columns='two' {...rest}>
    <div css={Top_} columns='left'>
      <AmosChat callToAction={
        <Button primary onClick={H.navto (`/review/links`)}>
          Submit another review
        </Button>
      }>{messages}</AmosChat>
    </div>
    <AuthBox/>
  </div>
}

export default Guest
