import {
  H, React,
  Icon
} from 'common'
import Top_ from './top.sc'
import Text_ from './text.sc'

const Button = ({icon, children, primary, ...rest}) => (
  <button {...rest} foo='foo'>
    {icon && <Icon src={icon}/>}
    {children && <Text_>{children}</Text_>}
  </button>
)

export default H.style (Button) (Top_)
