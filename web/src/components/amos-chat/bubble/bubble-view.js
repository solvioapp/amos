import {H, React} from 'common'
import Top_ from './bubble-top.sc'
import Tail_ from './tail.sc'

const Bubble = ({children, ...rest}) => (
  <div {...rest}>
    <Tail_/>
    {children}
  </div>
)

export default H.style (Bubble) (Top_)
