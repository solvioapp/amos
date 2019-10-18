import {H, React} from 'common'
import Top_ from './top.sc'

const Title = ({children, ...rest}) => (
  <h1 {...rest}>
    {children}
  </h1>
)

export default H.style (Title) (Top_)