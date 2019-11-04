import {H, React} from 'common'
import top from './input-top.sc'

const Input = (props, ref) => (
  <input css={top} {...props} ref={ref}>{props.children}</input>
)

export default H.styled (React.forwardRef (Input)) ``