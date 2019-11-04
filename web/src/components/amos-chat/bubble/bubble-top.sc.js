import {styled, css, CONST} from 'common'

const

{avatar_size_regular, avatar_size_large} = CONST

const Top_ = css`
  background-color: white;
  border-radius: 12px;
  border: 1.3px solid black;
  max-width: ${550 - avatar_size_large - 50 - 10}px;
  padding: 8px 12px;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
  text-align: justify;
  word-break: break-word;
  hyphens: auto;
`

export default Top_
