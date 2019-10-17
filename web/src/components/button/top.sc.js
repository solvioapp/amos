import {styled,css, H} from 'common'
import Icon_ from 'components/icon/top.sc'
import Text_ from './text.sc'

const primary = css`
  ${'' /* ${props=>console.log(`primary!`, props)} */}
  background-color: #0066FF;
  border: 1px solid #0066FF;
  color: white;
  white-space: nowrap;

  &:hover {
    background-color: #2F82FF;
  }
`

const iconOnly = css`
  ${'' /* ${props=>console.log(`iconOnly!`, props)} */}
  font-size: 0;
  padding: 0;
  width: 40px;

  > svg {
    height: 17px;
  }
`

const Top_ = css`
  ${'' /* ${props => console.log(`props Top_`, props)} */}
  background-color: white;
  border-radius: 8px;
  border: 1.3px solid #959595;
  color: black;
  cursor: pointer;
  font-size: 15px;
  height: ${H.prop(`height`, `40px`)};
  padding: 0 20px;
  user-select: none;
  width: ${H.prop(`width`, `auto`)};

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
    
    &:hover {
      background-color:grey;
    }
  }

  > ${Icon_} {
    height: 15px;
  }

  > ${Text_} {
    vertical-align: middle;
  }

  > ${Icon_} + ${Text_} {
    margin-left: 8px;
  }

  &:active {
    transform: scale(0.98);
  }
  &:hover {
    background-color: #fafafc;
  }
  &:focus {
    outline: none;
  }

  ${H.ifProp(`primary`, primary)}
  ${({icon,children}) => { if (icon && !children) return iconOnly}}
`

export default Top_