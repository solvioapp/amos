import {
  React, R, W, CONST, validation,
  AmosChat, Button, Input, Checkbox, AuthOptions
} from 'common'

const message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.signup
)

const Form = ({onSubmit, messages, form: {register}, errors}) => (
  <form onSubmit={onSubmit}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      errors={errors}
      name='username'
      label='Username'
      ref={register}
    />
    <Input
      errors={errors}
      name='email'
      label='Email'
      ref={register}
    />
    <Input
      errors={errors}
      type='password'
      name='password'
      label='password'
      ref={register}
    />
    <Input
      errors={errors}
      type='password'
      name='repeatPassword'
      label='Repeat password'
      ref={register}
    />
    {/* {repeatPasswordErr()} */}
    <Checkbox>
      Subscribe to Solvio Monthly
    </Checkbox>
    <Button primary width='150px' type='submit'>
      Sign up
    </Button>
    <AuthOptions first={{
      link: `/signup`,
      text: `Use social`
    }} />
  </form>
)

export default R.compose (
  W.SIGNUP,
  W.form ({validationSchema: validation.signup}) ({message})
) (Form)
