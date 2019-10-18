import {H, React} from 'common'
import Bubble from './bubble'
import Top_ from './top.sc'
import Avatar from './avatar'
import ChatFlow_ from './chat-flow.sc'

// s

const toText = child => typeof child === `function` ? child() : child

const toBubble = (child, key) => (
  <Bubble key={key}>{toText (child)}</Bubble>
)

const AmosChat = ({avatar = `regular`, children, callToAction, ...rest}) => {
  if (typeof children !== `object`) {
    // children is either a string or a function, not an array
    children = [children]
  }

  return (
    <div {...rest}>
      {avatar !== `none` && <Avatar size={avatar}/>}
      <ChatFlow_ size={avatar}>
        <Bubble>{toText (children[0])}</Bubble>
        {children.slice(1).map (toBubble)}
        {callToAction}
      </ChatFlow_>
    </div>
  )
}

export default H.style (AmosChat) (Top_)
