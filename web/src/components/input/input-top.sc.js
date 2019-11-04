import {css} from 'common'
import Label_ from './label.sc'

const Top_ = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  > ${Label_} {
    margin: 0 0 7.5px 11px;
  }
`

export default Top_
