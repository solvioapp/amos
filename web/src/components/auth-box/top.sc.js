import {styled, css, CSS_CONST, AuthOptions_} from 'common'
import Button_ from 'components/button'

const

{AVATAR_SIZE_LARGE, AVATAR_SIZE_REGULAR} = CSS_CONST

const Top_ = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: ${AVATAR_SIZE_REGULAR / 2 - 21.7 + (AVATAR_SIZE_LARGE - AVATAR_SIZE_REGULAR) / 2}px;

  > ${Button_} + ${Button_} {
    margin-top: 20px;
  }

  > ${AuthOptions_} {
    margin-top: 20px;
  }
`

export default Top_
