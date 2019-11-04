import {H, React, NavLink} from 'common'
import top from './link-top.sc'

const Link = (props) => (
  <NavLink css={top} {...props}>{props.children}</NavLink>
)

export default H.styled (Link) ``