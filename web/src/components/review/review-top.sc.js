import {
  H,
  Button, Panel
} from 'common'
import InputForm_ from './input-form.sc'

const two = H.css``

const left = H.css`
  /* > ${Button} {
    margin-top: 30px
  } */
`

const Top_ = H.css`
  ${'' /* ${props => props |> console.log ('Review Top', #)} */}
  ${Panel}
  /* ${({columns}) => eval(columns)} */
  ${'' /* > ${InputForm_} {
    margin-top: 30px;
  } */}
`

export default Top_
