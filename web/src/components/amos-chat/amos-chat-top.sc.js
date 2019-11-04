import {H, css} from 'common'
import ChatFlow_ from './chat-flow.sc'

const notSmall = H.css`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

const options = {
  medium: notSmall,
  large: notSmall
}

const top = H.css`
  align-items: flex-start;
  display: flex;
  max-width: fit-content;
  ${H.options (options, `avatar`)}

  ${ChatFlow_} {
    @media (max-width: 768px) {
      margin-left: 20px;
    }

    @media (min-width: 768px) {
      margin-left: 50px;
    }
  }
`

export default top
