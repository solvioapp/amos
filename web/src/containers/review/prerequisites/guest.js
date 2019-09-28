import {
  React,
  Title, AmosChat, Button
} from 'common'
import Buttons_ from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'
import {useReqState} from './'
import ReqList from './ReqList'

const Guest = ({...rest}) => {
  const {initItems, goFinish, goPrev, setPrerequisites} = useReqState()

  return (
    <Top_ {...rest}>
      <AmosChat>
      What do you need to know in order to make the most out of this resource?
      Again, try to be as detailed as possible.
      </AmosChat>
      <InputForm_>
        <Title>Prerequisites</Title>
        <ReqList onUpdate={setPrerequisites} initItems={initItems}/>
        <Buttons_>
          <Button onClick={goPrev}>
          Previous
          </Button>
          <Button primary onClick={goFinish}>
          Finish
          </Button>
        </Buttons_>
      </InputForm_>
    </Top_>
  )
}

export default Guest
