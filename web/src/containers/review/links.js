import {
  React, W,
  AmosChat, Button, Title, Input
} from 'common'
import Top_ from './top.sc'
import InputForm_ from './input-form.sc'

const Links = ({onSubmit, messages, form, errors, ...rest}) => (
  <div css={Top_} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Links</Title>
      <Input
        name='links'
        ref={form.register}
        errors={errors}
      />
      <form onSubmit={onSubmit.next}>
        <Button primary type='submit'>
          Next
        </Button>
      </form>
    </InputForm_>
  </div>
)

export default W.withReview (`links`) (Links)
