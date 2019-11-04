import {H, React} from 'common'
import top from './chat-flow-top.sc'

const ChatFlow = (props) => (
  <div css={top} {...props}>{props.children}</div>
)

export default H.styled (ChatFlow) ``