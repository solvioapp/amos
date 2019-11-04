import {
  H, styled, CONST, css,
  Button,
} from 'common'
import Bubble from './bubble'
import CallToAction_ from './call-to-action.sc'

const

{avatar_medium, avatar_large, avatar_small} = CONST,

none = H.css`
  margin-top: 0;
`,

small = H.css`
  margin-top: ${avatar_small / 2 - 21.7+ (avatar_large - avatar_small) / 2}px;
`,

medium = H.css`
  /* 21.7 is half of height of first line of bubble */
  margin-top: ${avatar_medium / 2 - 21.7+ (avatar_large - avatar_medium) / 2}px;
`,

large = H.css`
  margin-top: ${avatar_large / 2 - 21.7 }px
`,

ChatFlow_ = styled.div`
  ${props => eval(props.size)};

  align-items: flex-start;
  display: flex;
  flex-direction: column;

  ${CallToAction_} {
    margin-top: 30px;
    /* align-self: center; */
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  ${Bubble} + ${Bubble} {
    margin-top: 16px;
  }

  @media (max-width: 768px) {
    align-items: stretch;
  }
`

export default ChatFlow_