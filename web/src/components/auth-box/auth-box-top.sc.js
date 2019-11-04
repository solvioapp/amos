import {
  css, CONST,
  AuthOptions, Button
} from 'common'

const

{avatar_size_large, avatar_size_regular} = CONST

const Top_ = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: ${avatar_size_regular / 2 - 21.7 + (avatar_size_large - avatar_size_regular) / 2}px;

  > a + ${Button} {
    margin-top: 20px;
  }

  > ${AuthOptions} {
    margin-top: 20px;
  }
`

export default Top_
