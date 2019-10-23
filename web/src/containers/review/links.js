import {
  React, hooks,
  AmosChat, Button, Title, Input
} from 'common'
import Top_ from './top.sc'
import InputForm_ from './input-form.sc'

const Links = (props) => {
  
  const {
    onSubmit, messages, form, errors, valid, onChange, ...rest
  } = hooks.useReviewLinks (`links`) (props)
  onChange |> console.log ('onChange', #)
  valid |> console.log ('valid', #)

  return <div css={Top_} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <InputForm_>
      <Title>Links</Title>
      <Input
        name='links'
        ref={form.register}
        errors={errors}
        valid={valid}
        onChange={onChange}
      />
      <form onSubmit={onSubmit.next}>
        <Button primary type='submit'>
          Next
        </Button>
      </form>
    </InputForm_>
  </div>
}

// export default hooks.withReview (`links`) (Links)
export default Links
