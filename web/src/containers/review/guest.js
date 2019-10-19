import {
  React, H, styled,
  AmosChat, AuthBox, Button, Panel
} from 'common'
import Top_ from './top.sc'

const Panel_ = styled.div`${Panel}`

const Guest = ({...rest}) => (
  <div css={Top_} {...rest} columns='two'>
    <Panel_ columns='left'>
      <AmosChat avatar='large' callToAction={
        <Button primary onClick={H.navto (`/review/links`)}>
          Submit anonymously
        </Button>
      }>
        Here you can add reviews for online learning resources - either anonymously or
        by signing up. I would recommend signing up first because then you can get reputation
        for your reviews. 🙂
      </AmosChat>
    </Panel_>
    <AuthBox/>
  </div>
)

Guest |> console.log ('Guest', #)

// export default H.style (Guest) (Top_)
// const returning = (H.style (Guest) (Top_)).attrs({columns: 'two'})
export default styled (Guest) ``