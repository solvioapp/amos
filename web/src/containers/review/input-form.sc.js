import {
  styled,
  Button
} from 'common'
import Input from 'components/Input/top.sc'

const InputForm_ = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  > ${Button} {
    align-self: center;
    margin-top: 30px;
  }

  ${Input} {
    margin-top: 24px;
  }
`

export default InputForm_