import {styled} from 'common'

const Top_ = styled.form`
  padding: 0.5em 1em;
  margin-top: 1em;

  &:nth-of-type(1n+2) {
      border-top: 1px solid gray;
  }
`

export default Top_