import {
  H, R, React, W,
  Button, AuthOptions
} from 'common'
import Top_ from './top.sc'

const fbLogin = (authFacebook) => ({status, authResponse: {accessToken: fbAccessToken}}) => (
  R.equals (status, `connected`) && do {
    authFacebook ({variables: {input: {fbAccessToken}}})
  }
)

const onClick = (authFacebook) => () => {
  /* eslint-disable no-undef */
  FB.login(fbLogin (authFacebook), {scope: [`public_profile`, `email`]})
}

const AuthBox = ({authFacebook, ...rest}) => (
  <div {...rest}>
    <Button icon='github' width={`250px`}>Continue with Github</Button>
    <Button
      icon='facebook'
      width={`250px`}
      onClick={onClick (authFacebook)}
    >
      Continue with Facebook
    </Button>
    <AuthOptions/>
  </div>
)

// export default H.style (withFacebook (AuthBox)) (Top_)
export default AuthBox
  |> W.FACEBOOK
