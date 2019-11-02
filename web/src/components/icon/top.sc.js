import {css, H} from 'common'

const _book = css`
  position: relative;
  top: 12px;
  left: 5px;
`

const Top_ = css`
  display: ${(props) => props.book ? '' : `inline-block`};
  height: ${H.prop (`height`, `24px`)};
  vertical-align: ${(props) => props.book ? '' : `middle`};
  ${({book}) => book && _book}
`

export default Top_
