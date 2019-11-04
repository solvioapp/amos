import {H, R, React} from 'common'
import Bubble from './bubble'
import top from './amos-chat-top.sc'
import Avatar from './avatar'
import chatFlow from './chat-flow.sc'
import callToAction from './call-to-action.sc'

const toText = child => typeof child === `function` ? child() : child,

toBubble = (child, key) => (
  <Bubble key={key}>{toText (child)}</Bubble>
),

AmosChat = ({avatar = `medium`, children, callToAction: CTA, ...rest}) => {
  if (typeof children !== `object`) {
    // children is either a string or a function, not an array
    children = R.of (children)
  }

  return (
    <div css={top} {...{avatar}} {...rest}>
      {avatar !== `none` && <Avatar size={avatar} timeout={2400}/>}
      <div css={chatFlow} size={avatar}>
        <Bubble>{toText (children[0])}</Bubble>
        {children.slice(1).map (toBubble)}
        <div css={callToAction}>{CTA}</div>
      </div>
    </div>
  )
}

export default H.styled (AmosChat) ``
