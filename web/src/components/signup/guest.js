import {
  H, React, styled,
  AmosChat, AuthBox
} from 'common'
import Top_ from './signup-top.sc'

const Guest = ({...rest}) => (
  <div css={Top_} {...rest}>
    {/* <Title>Sign up</Title> */}
    <AmosChat>
      Once you sign up, you'll be able to get attribution for your Reviews. And it's free!
    </AmosChat>
    <AuthBox/>
  </div>
)

export default styled (Guest) ``
