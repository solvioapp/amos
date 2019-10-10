import Top_ from './top.sc'
import Icon from 'components/icon'
import Text_ from './text.sc'
import React from 'react'
import styled from 'styled-components'

const addStyle = C => _css => (
  styled(C)`
    ${_css};
  `
)

export const Top__ = styled.button`
  ${props => console.log(`props Top`, props)}
  ${Top_}
`

const Button = ({icon, children, className, ...rest}) => {
  
  return (
    <button iconOnly={icon && !children} className={className} {...rest}>
    {/* // <button> */}
    {icon && <Icon src={icon}/>}
    {children && <Text_>{children}</Text_>}
  {/* // </button> */}
    </button>
  )
}

export default addStyle (Button) (Top_)
