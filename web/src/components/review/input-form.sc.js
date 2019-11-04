import {
  styled,
  Button, Input, Title
} from 'common'

const InputForm_ = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;

  ${Input} {
    margin-top: 18px;
  }

  ${Title} {
    margin-top: 18px;
  }

  form {
    display: flex;
    justify-content: center;
  }

  form > ${Button} {
    /* margin-top: 30px; */
  }
`

export default InputForm_