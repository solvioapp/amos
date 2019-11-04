import {H, React} from 'common'
import Top_ from './not-found-top.sc'

const NotFound = ({...rest}) => (
  <div {...rest}>
    Page not found
  </div>
)

export default H.style (NotFound) (Top_)
