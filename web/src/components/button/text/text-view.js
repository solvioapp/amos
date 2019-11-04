import {H, React} from 'common'

const Text = (props) => (
  <span {...props}>{props.children}</span>
)

export default H.styled (Text) ``