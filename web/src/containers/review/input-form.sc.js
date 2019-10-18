import {
  styled,
  Button, Input
} from 'common'

const InputForm_ = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  > ${Button} {
    align-self: center;
    margin-top: 30px;
  }

  ${Input} + ${Input} {
    margin-top: 54px;
  }
`

export default InputForm_