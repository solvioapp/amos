import {
  React,
  AmosChat, Input, Button, AuthOptions
} from 'common'
import Form_ from './form.sc'

const Form = ({onSubmit, messages, register, errors}) => (
  <Form_ onSubmit={onSubmit}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      errors={errors}
      label='Username or email'
      name='usernameOrEmail'
      ref={register}
    />
    <Input
      errors={errors}
      label='Password'
      name='password'
      type='password'
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
)

export default Form