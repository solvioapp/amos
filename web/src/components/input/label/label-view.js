import {H, React} from 'common'
import top from './label-top.sc'

const Label = props => (
  <span css={top} {...props}>{props.children}</span>
)

export default H.styled (Label) ``