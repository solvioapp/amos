import {H, React} from 'common'
import top from './bubble-top.sc'
import tail from './tail.sc'

const Bubble = ({children, ...rest}) => (
  <div css={top} {...rest}>
    <div css={tail}/>
    {children}
  </div>
)

export default H.styled (Bubble) ``
