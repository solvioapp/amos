import {
  React, R, W,
  AmosChat, Button, Title, Input
} from 'common'
import Buttons from '../buttons.sc'
import InputForm_ from '../input-form.sc'
import Top_ from '../top.sc'

const Topics = ({results, messages, topic, isValid, times,
  onSubmit, onClick, form, ...rest}) => (
  <Top_ {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Topics</Title>
      {R.times (
        (key,
          name = `topic[${key}]`) => (
          <Input
            name={name}
            ref={form.register}
            key={key}
            link={false}
            errors={form.errors[name]}
            dropdown={!isValid[key]}
            results={results?.[key]}
            onClick={onClick[key]}
          />
        )) (times)}
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