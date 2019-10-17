import {React} from 'common'
import Authorized from './authorized'
import Guest from './guest'

const Thanks = ({isAuthenticated}) => (
  isAuthenticated ? <Authorized/> : <Guest/>
)

export default (Thanks)
