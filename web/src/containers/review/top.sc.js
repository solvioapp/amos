import {
  styled, css,
  Button, Panel
} from 'common'
import InputForm_ from './input-form.sc'

const two = css``

const left = css`
  /* > ${Button} {
    margin-top: 30px
  } */
`

const Top_ = css`
  ${Panel}
  /* ${({columns}) => eval(columns)} */
  ${'' /* > ${InputForm_} {
    margin-top: 30px;
  } */}
`

export default Top_
