import {styled, Button, H, CSS_CONST, css} from 'common'
import Bubble_ from './bubble/top.sc'

const

{AVATAR_SIZE_REGULAR, AVATAR_SIZE_LARGE} = CSS_CONST,

none = css`
  margin-top: 0;
`,

regular = css`
  /* 21.7 is half of height of first line of bubble */
  margin-top: ${AVATAR_SIZE_REGULAR / 2 - 21.7+ (AVATAR_SIZE_LARGE - AVATAR_SIZE_REGULAR) / 2}px;
`,

large = css`
  margin-top: ${AVATAR_SIZE_LARGE / 2 - 21.7 }px
`,

ChatFlow_ = styled.div`
  ${props => eval(props.size)};

  align-items: flex-start;
  display: flex;
  flex-direction: column;

  > ${Button} {
    margin-top: 30px;
    align-self: center;
  }

  > ${Bubble_} + ${Bubble_} {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

export default ChatFlow_