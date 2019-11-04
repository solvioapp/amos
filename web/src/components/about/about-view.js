import {
  React, H, useEffect,
  AmosChat, Button
} from 'common'

const messages = [
  `👋 I'm Amos. I lived in the 1600s and was a reformer of education. 😎`,
  `Now I'm back to teach you anything you want!`,
  `You can learn something. You can also submit a Review for your fav resources and help me expand my database.`,
  `Finally, you can sign up to get attribution for your Reviews and full access to the app. 🙃`,
  <span>If you'd like to learn more about what I'm doing, check out my <a href='https://github.com/amosapp/amos/wiki'>wiki</a>!</span>
]

const About = () => {
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

  return <AmosChat avatar='large' callToAction={
    <>
    <Button onClick={H.navto (`/signup`)}>
      Sign up
    </Button>
    <Button primary onClick={H.navto (`/learn`)}>
      Learn
    </Button>
    </>
  }>
    {messages}
  </AmosChat>
}

export default H.style (About) ``