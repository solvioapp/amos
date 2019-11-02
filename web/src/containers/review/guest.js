import {
  React, H, styled,
  AmosChat, AuthBox, Button, Panel
} from 'common'
import Top_ from './top.sc'

const messages = [
  `Here you can add reviews for online learning resources - either anonymously or
  by signing up. I would recommend signing up first because then you'll never have to see this screen again!!`,
  `... and you'll get attribution for your reviews.`
]

const Guest = ({...rest}) => (
  <div css={Top_} {...rest} columns='two'>
    <div css={Top_} columns='left'>
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
)

  // <div css={Top_} {...rest} columns='two'>
  //   <div css={Top_} columns='left'>
  //     <AmosChat callToAction={
  //       <>
  //       <Button onClick={H.navto (`/review/links`)}>
  //         Submit anonymously
  //       </Button>
  //       <Button primary onClick={H.navto (`/signup`)}>
  //         Sign up
  //       </Button>
  //       </>
  //     }>
  //       {messages}
  //     </AmosChat>
  //   </div>
  //   <AuthBox/>
  // </div>

export default styled (Guest) ``