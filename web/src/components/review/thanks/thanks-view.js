import {
  H, React, W,
  AuthBox
} from 'common'
import useThanksHook from './thanks-hook'
import top from '../review-top.sc'

const messages = [
  `Thanks for the review!`,
]

const Thanks = (props) => {

  const {amosChat} = useThanksHook ({...props, messages})

  return props.isAuthenticated
    ? (
      <div css={top} {...props}>
        {amosChat}
      </div>
    )
    : (
      <div css={top} columns='two' {...props}>
        <div css={top} columns='left'>
          {amosChat}
        </div>
        <AuthBox/>
      </div>
    )
}

export default H.styled (W.GET_AUTH (Thanks)) ``
