import {H, React} from 'common'
import Top_ from './top.sc'
import image from './amos.gif'

const Avatar = ({size, ...rest}) => (
  <img size={size} src={image} {...rest}/>
)

export default H.style (Avatar) (Top_)