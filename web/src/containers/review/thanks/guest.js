import {
  H, React, W,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const messages = [
  `Thanks for the review!`,
]

const Guest = ({isAuthenticated, ...rest}) => {

  const amosChat = (
    <AmosChat callToAction={
      <Button primary onClick={H.navto (`/review/links`)}>
        Submit another review
      </Button>
    }>{messages}</AmosChat>
  )

  return isAuthenticated
    ? (
      <div css={Top_} {...rest}>
        {amosChat}
      </div>
    )
    : (
      <div css={Top_} columns='two' {...rest}>
        <div css={Top_} columns='left'>
          {amosChat}
        </div>
        <AuthBox/>
      </div>
    )
}

export default W.GET_AUTH (Guest)
