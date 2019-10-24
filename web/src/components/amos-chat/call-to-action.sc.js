import {
  H, styled,
  Button,
} from 'common'
import Bubble from './bubble'

const

CallToAction_ = styled.div`

  display: flex;

  > ${Button} {
    margin-top: 30px;
    align-self: center;
  }

  > ${Bubble} + ${Bubble} {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

export default CallToAction_