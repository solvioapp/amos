import {
  H, React,
  AmosChat, Button
} from 'common'
import Top_ from './signup-top.sc'

const messages = [
  `Nice to meet you too 😴`,
  () => <span>Now - let's get to work! 🖌 📚<br/>Go ahead and ...</span>,
]

const Success = ({...rest}) => (
  <Top_ {...rest}>
    <AmosChat>{messages}</AmosChat>
    <Button primary onClick={H.navto (`/review`)}>
      Submit a Review
    </Button>
  </Top_>
)

export default Success
