import {H} from 'common'

const _book = H.css`
  position: relative;
  top: 12px;
  left: 5px;
`

const Top_ = H.css`
  display: ${(props) => props.book ? '' : `inline-block`};
  height: ${H.prop (`height`, `24px`)};
  vertical-align: ${(props) => props.book ? '' : `middle`};
  ${({book}) => book && _book}
`

export default Top_
