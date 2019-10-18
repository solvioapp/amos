import {
  H, React, CONST,
  Button, AuthOptions, ReactTooltip
} from 'common'
import Top_ from './top.sc'

const AuthBox = ({...rest}) => (
  <div {...rest}>
    <ReactTooltip effect='solid'/>
    <Button data-tip={CONST.coming_soon} icon='facebook' width={`250px`}>Continue with Facebook</Button>
    <Button data-tip={CONST.coming_soon} icon='google' width={`250px`}>Continue with Google</Button>
    <AuthOptions/>
  </div>
)

export default H.style (AuthBox) (Top_)
