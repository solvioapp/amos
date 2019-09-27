import {
  React,
  Button, Title
} from 'common'
import Panel from './panel.sc'
import connect from './connect'

const Notifications = ({logout}) => (
  <Panel>
    <Title>Notifications</Title>
    <Button onClick={logout}>
      Logout
    </Button>
  </Panel>
)

export default connect(Notifications)
