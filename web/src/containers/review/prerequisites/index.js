import {
  React, hooks,
  AmosChat, Button, Title, Input
} from 'common'
import Buttons from '../buttons.sc'
import Top_ from '../top.sc'
import InputForm_ from '../input-form.sc'

const Prerequisites = (props) => {
  const {
    results, messages, isValid,
    onSubmit, onClick, form, onChange, ...rest
  } = hooks.useReviewTopics (`prerequisites`) (props)

  return <div css={Top_} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Prerequisites</Title>
      <Input
        name='prerequisites'
        ref={form.register}
        link={false}
        errors={form.errors}
        dropdown={!isValid}
        onChange={onChange[0]}
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
  </div>
}

// export default hooks.withReviewTopics (`prerequisites`) (Prerequisites)
export default Prerequisites