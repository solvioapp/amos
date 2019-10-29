import {
  R, hooks, H, React, CONST, validation,
  AmosChat, Button, Input, Checkbox, AuthOptions
} from 'common'
import Top_ from './top.sc'

const message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.signup
)

hooks.FACEBOOK |> console.log ('hooks.FACEBOOK', #)

const Facebook = (props) => {
  const {
    onSubmit, messages, form: {register}, errors, ...rest
  } = hooks.form ({validationSchema: validation.usernameOnly}) ({message}) (props)
  return <form css={Top_} onSubmit={onSubmit} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      errors={errors}
      name='username'
      label='Username'
      ref={register}
    />
    <Button primary width='150px' type='submit'>
      Sign up
    </Button>
    {/* <AuthOptions first={{
      link: `/signup`,
      text: `Use social`
    }} /> */}
  </form>
}

export default Facebook
|> hooks.FACEBOOK
