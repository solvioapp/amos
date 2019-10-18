import {
  styled, css,
  Panel, AmosChat, Checkbox, Button, AuthOptions, Input
} from 'common'

const Top_ = css`
  ${Panel}
  ${Input} {
    margin-top: 24px;
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
