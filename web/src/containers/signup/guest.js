import {
  React,
  AmosChat, AuthBox
} from 'common'
// import Title from 'components/title'
import Top_ from './top.sc'

const Guest = ({...rest}) => (
  <Top_ {...rest}>
    {/* <Title>Sign up</Title> */}
    <AmosChat>
      Once you sign up, you'll be able to get reputation for your Reviews. And it's free!
    </AmosChat>
    <AuthBox/>
  </Top_>
)

export default Guest
