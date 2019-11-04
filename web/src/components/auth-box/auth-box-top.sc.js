import {
  css, CSS_CONST,
  AuthOptions, Button
} from 'common'

const

{AVATAR_SIZE_LARGE, AVATAR_SIZE_REGULAR} = CSS_CONST

const Top_ = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: ${AVATAR_SIZE_REGULAR / 2 - 21.7 + (AVATAR_SIZE_LARGE - AVATAR_SIZE_REGULAR) / 2}px;

  > a + ${Button} {
    margin-top: 20px;
  }

  > ${AuthOptions} {
    margin-top: 20px;
  }
`

export default Top_
