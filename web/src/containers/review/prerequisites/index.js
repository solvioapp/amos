import {
  React, W,
  AmosChat, Button, Title, Input
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'

const Prerequisites = ({results, messages, topic, isValid,
  onSubmit, onClick, form, ...rest}) => (
  <Top_ {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Prerequisites</Title>
      <Input
        name='prerequisites'
        ref={form.register}
        results={results}
        link={false}
        errors={form.errors}
        dropdown={!isValid}
        {...{results, onClick}}
      />
      <Buttons>
        <form onSubmit={onSubmit.previous}>
          <Button type='submit'>
            Previous
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

export default W.withReviewTopics (`prerequisites`) (Prerequisites)