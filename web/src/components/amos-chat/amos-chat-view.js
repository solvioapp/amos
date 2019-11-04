import {H, R, React} from 'common'
import Bubble from './bubble'
import top from './amos-chat-top.sc'
import Avatar from './avatar'
import ChatFlow_ from './chat-flow.sc'
import CallToAction_ from './call-to-action.sc'

// s

const toText = child => typeof child === `function` ? child() : child

const toBubble = (child, key) => (
  <Bubble key={key}>{toText (child)}</Bubble>
)

const AmosChat = ({avatar = `medium`, children, callToAction, ...rest}) => {
  if (typeof children !== `object`) {
    // children is either a string or a function, not an array
    children = R.of (children)
  }

  return (
    <div css={top} {...{avatar}} {...rest}>
      {avatar !== `none` && <Avatar size={avatar} timeout={2400}/>}
      <ChatFlow_ size={avatar}>
        <Bubble>{toText (children[0])}</Bubble>
        {children.slice(1).map (toBubble)}
        <CallToAction_>{callToAction}</CallToAction_>
      </ChatFlow_>
    </div>
  )
}

export default H.styled (AmosChat) ``
