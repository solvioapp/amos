import {css, H} from 'common'

const Top_ = css`
  display: ${(props) => props.book ? '' : `inline-block`};
  height: ${H.prop (`height`, `24px`)};
  vertical-align: ${(props) => props.book ? '' : `middle`};
`

export default Top_
