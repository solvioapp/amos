import {
  React, CONST,
  AmosChat, Button
} from 'common'
import Top_ from './profile-top.sc'
import connect from './connect'

const Profile = ({logout}) => (
  <Top_>
    <AmosChat callToAction={
      <Button primary onClick={logout}>
        Logout
      </Button>}>
      {CONST.profile}
    </AmosChat>
  </Top_>
)

export default connect (Profile)
