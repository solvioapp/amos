import {
  styled,
  Panel, AmosChat, Checkbox, Button, AuthOptions
} from 'common'
import Input from 'components/input/top.sc'

const Top_ = styled(Panel)`
  ${Input} + ${Input} {
    margin-top: 30px;
  }

  ${Input} + ${AmosChat} {
    margin-top: 30px;
  }

  ${Checkbox} {
    margin-top: 36px;
  }

  ${Button} {
    margin-top: 30px;
  }

  ${AuthOptions} {
    margin-top: 24px;
  }
`

export default Top_
