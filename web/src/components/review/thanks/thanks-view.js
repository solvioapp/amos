import {
  React, W,
  AuthBox
} from 'common'
import useThanksHook from './thanks-hook'
import Top_ from '../review-top.sc'

const messages = [
  `Thanks for the review!`,
]

const Thanks = (props) => {

  const {amosChat} = useThanksHook ({...props, messages})

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

export default W.GET_AUTH (Thanks)
