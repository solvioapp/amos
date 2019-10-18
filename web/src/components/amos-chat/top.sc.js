import {css} from 'common'
import ChatFlow_ from './chat-flow.sc'

const Top_ = css`
  align-items: flex-start;
  display: flex;
  max-width: fit-content;

  > ${ChatFlow_} {
    margin-left: 50px;
  }
`

export default Top_
