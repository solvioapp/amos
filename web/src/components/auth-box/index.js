import {
  React,
  Button, AuthOptions
} from 'common'
import Top_ from './top.sc'

const AuthBox = ({...rest}) => (
  <Top_ {...rest}>
    <Button icon='facebook' width={`250px`}>Continue with Facebook</Button>
    <Button icon='google' width={`250px`}>Continue with Google</Button>
    <AuthOptions/>
  </Top_>
)

export default AuthBox
