import {
  React, H, useEffect,
  AmosChat, AuthBox, Button,
} from 'common'
import top from './review-top.sc'

const messages = [
  `Here you can add reviews for online learning resources - either anonymously or
  by signing up. I would recommend signing up first because then you'll never have to see this screen again!!`,
  `... and you'll get attribution for your reviews.`
]

const onKeyPress = (e) => {
  const {key} = e
  key === `Enter` && do {
    e.preventDefault()
    H.navto (`/review/links`) ()
  }
}

const Guest = ({...rest}) => {
  useEffect(() => {
    document.addEventListener (`keypress`, onKeyPress)

    return () => document.removeEventListener (`keypress`, onKeyPress)
  }, [onKeyPress])

  return <div css={top} {...rest} columns='two'>
    <div css={top} columns='left' {...rest}>
      <AmosChat callToAction={
        <Button onClick={H.navto (`/review/links`)}>
          Submit anonymously
        </Button>
      }>
        {messages}
      </AmosChat>
    </div>
    <AuthBox/>
  </div>
}

export default H.styled (Guest) ``