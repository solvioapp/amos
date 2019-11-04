import {H, React} from 'common'
import top from './buttons-top.sc'

const Buttons = (props) => (
  <div css={top} {...props}>{props.children}</div>
)

export default H.styled (Buttons) ``