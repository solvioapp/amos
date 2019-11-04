import {css, Input} from 'common'

const top = css`
  ${'' /* ${Panel} */}
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;

  @media (min-width: 768px) {
    margin-top: -7.5vh;
  }

  ${Input} {
    margin-top: 42px;
  }
`

export default top
