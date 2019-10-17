import {
  React, W, R, H,
  AmosChat, Button, Title, Input
} from 'common'
import Buttons from './buttons.sc'
import InputForm_ from './input-form.sc'
import Top_ from './top.sc'

const Topics = ({results, messages, topic, isValid,
  loading, onSubmit, onClick, form, errors, ...rest}) => (
  <Top_ {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Topics</Title>
      <form autocomplete='off'>
        <Input
          name='topics'
          ref={form.register}
          link={false}
          errors={form.errors}
          dropdown={!isValid}
          {...{results, topic, onClick}}
        />
      </form>
      <Buttons>
        <form onSubmit={onSubmit.previous}>
          <Button type='submit'>
            Previous
          </Button>
        </form>
        <form onSubmit={onSubmit.next}>
          <Button primary type='submit'>
            Next
          </Button>
        </form>
        <form onSubmit={onSubmit.finish}>
          <Button type='submit'>
            Finish
          </Button>
        </form>
      </Buttons>
    </InputForm_>
  </Top_>
)

export default W.withReviewTopics (`topics`) (Topics)