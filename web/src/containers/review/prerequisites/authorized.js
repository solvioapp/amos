import {
  React,
  AmosChat, Title, Button
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'
import {useReqState} from './'
import ReqList from './ReqList'

const Authorized = ({...rest}) => {
  const {initItems, goFinish, goPrev, setPrerequisites} = useReqState()

  return <Top_ {...rest}>
    <AmosChat>
      What do you need to know in order to make the most out of this resource?
      Again, try to be as detailed as possible.
    </AmosChat>
    <InputForm_>
      <Title>Prerequisites</Title>
      <ReqList onUpdate={setPrerequisites} initItems={initItems}/>
      <Buttons>
        <Button onClick={goPrev}>
          Previous
        </Button>
        <Button primary onClick={goFinish}>
          Finish
        </Button>
      </Buttons>
    </InputForm_>
  </Top_>
}

export default Authorized
