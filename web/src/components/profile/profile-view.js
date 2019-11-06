import {
  H, React, CONST,
  AmosChat, Button
} from 'common'
import top from './profile-top.sc'
import useProfileHook from './profile-hook'

const View = (props) => {
  const {logout} = useProfileHook (props)
  return <div css={top} {...props}>
    <AmosChat callToAction={
      <Button primary onClick={logout}>
        Logout
      </Button>}>
      {CONST.profile}
    </AmosChat>
  </div>
}

export default H.styled (View) ``
