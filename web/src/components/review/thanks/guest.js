import {
  H, React, W, useEffect,
  AmosChat, AuthBox, Button
} from 'common'
import Top_ from '../top.sc'

const messages = [
  `Thanks for the review!`,
]

const Guest = ({isAuthenticated, ...rest}) => {

  const amosChat = (
    <AmosChat callToAction={
      <Button primary onClick={H.navto (`/learn`)}>
        Learn
      </Button>
    }>{messages}</AmosChat>
  )

  const onKeyPress = (e) => {
    const {key} = e
    key === `Enter` && do {
      e.preventDefault()
      H.navto (`/learn`) ()
    }
  }

  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  return isAuthenticated
    ? (
      <div css={Top_} {...rest}>
        {amosChat}
      </div>
    )
    : (
      <div css={Top_} columns='two' {...rest}>
        <div css={Top_} columns='left'>
          {amosChat}
        </div>
        <AuthBox/>
      </div>
    )
}

export default W.GET_AUTH (Guest)
