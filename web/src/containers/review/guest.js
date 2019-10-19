import {
  React, H, styled,
  AmosChat, AuthBox, Button, Panel
} from 'common'
import Top_ from './top.sc'

const Guest = ({...rest}) => (
  <div css={Top_} {...rest} columns='two'>
    <div css={Top_} columns='left'>
      <AmosChat avatar='large' callToAction={
        <Button primary onClick={H.navto (`/review/links`)}>
          Submit anonymously
        </Button>
      }>
        Here you can add reviews for online learning resources - either anonymously or
        by signing up. I would recommend signing up first because then you can get reputation
        for your reviews. 🙂
      </AmosChat>
    </div>
    <AuthBox/>
  </div>
)

export default styled (Guest) ``