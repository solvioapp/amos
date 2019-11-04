import {
  React, W,
  AuthBox
} from 'common'
import useConfirmHook from './confirm-hook'
import Top_ from '../review-top.sc'

const Confirm = (props) => {

  const {amosChat} = useConfirmHook (props)

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
