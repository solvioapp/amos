import {
  React,
  AmosChat, Button, Title
} from 'common'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'
import {useReqState} from './'
import LinkURLS from './LinkURLs'

const Guest = ({...rest}) => {
  const {setLinks, initItems, goNext} = useReqState()

  return <Top_ {...rest}>
    <AmosChat>
      Let's start with the links. Please enter the  URLs that lead to the resource 😇
    </AmosChat>
    <InputForm_>
      <Title>Links</Title>
      <LinkURLS onUpdate={setLinks} initItems={initItems}/>
      <Button primary onClick={goNext}>
        Next
      </Button>
    </InputForm_>
  </Top_>
}

export default Guest
