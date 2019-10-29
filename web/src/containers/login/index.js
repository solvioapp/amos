import {
  React, R, hooks, CONST, validation,
  AmosChat, Input, Button, AuthOptions
} from 'common'
import Form_ from './form.sc'

const message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.login
)

const boxShadowWidth = `0`

const Form = (props) => {
  const {
    onSubmit, messages, form: {register, errors}
  } = hooks.form
  /* eslint-disable indent */
    ({
      validationSchema: validation.signup,
      submitFocusError: false,
      mode: `onBlur`,
    })
    ({message})
    (props)
  return <Form_ onSubmit={onSubmit}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      label='Username or email'
      name='usernameOrEmail'
      ref={register}
      {...{errors, boxShadowWidth}}
    />
    <Input
      label='Password'
      name='password'
      type='password'
      dontFocus={true}
      {...{errors, boxShadowWidth}}
      ref={register}
    />
    {/* <Link to='/forgot-password'>Forgot password</Link> */}
    <Button primary type='submit'>
      Log in
    </Button>
    <AuthOptions
      first={{
        link: `/signup`,
        text: `Use social`
      }}
      second={{
        link: `/signup/email`,
        text: `Sign up`
      }}
    />
  </Form_>
}

export default hooks.LOGIN (Form)