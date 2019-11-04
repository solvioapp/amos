import {H, React} from 'common'
import top from './text-top.sc'

const Text = (props) => (
  <div css={top} {...props}>{props.children}</div>
)

export default H.styled (Text) ``