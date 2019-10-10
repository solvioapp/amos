import {
  React, CONST,
  Button, AuthOptions, ReactTooltip
} from 'common'
import Top_ from './top.sc'

const AuthBox = ({...rest}) => (
  <Top_ {...rest}>
    <ReactTooltip effect='solid'/>
    <Button data-tip={CONST.coming_soon} icon='facebook' width={`250px`}>Continue with Facebook</Button>
    <Button data-tip={CONST.coming_soon} icon='google' width={`250px`}>Continue with Google</Button>
    <AuthOptions/>
  </Top_>
)

export default AuthBox
