import {
  H, React, styled,
  Icon
} from 'common'
import Top_ from './button-top.sc'
import Text_ from './text.sc'

const Button = ({icon, children, ...rest}) => (
  <button css={Top_} {...rest}>
    {icon && <Icon src={icon}/>}
    {children && <Text_>{children}</Text_>}
  </button>
)

// export default H.style (Button) (Top_)
export default styled (Button) ``
