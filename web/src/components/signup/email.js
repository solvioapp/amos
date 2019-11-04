import {
  H, hooks, React, CONST, validation,
  AmosChat, Button, Input, AuthOptions
} from 'common'
import useEmailHook from './email-hook'
import Top_ from './signup-top.sc'

const message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.signup
)

const boxShadowWidth = `0`

const Email = (props) => {
  const {signup} = useEmailHook (props)
  const {
    onSubmit, messages, form: {register}, errors, ...rest
  } = hooks.form
  /* eslint-disable indent */
    ({
      validationSchema: validation.signup,
      submitFocusError: false,
      mode: `onBlur`,
    })
    ({message})
    ({...props, onSubmit: signup})
  return <form css={Top_} onSubmit={onSubmit} {...rest}>
    <AmosChat>
      {messages}
    </AmosChat>
    <Input
      name='username'
      label='Username'
      ref={register}
      {...{errors, boxShadowWidth}}
    />
    <Input
      name='email'
      label='Email'
      ref={register}
      dontFocus={true}
      {...{errors, boxShadowWidth}}
    />
    <Input
      type='password'
      name='password'
      label='password'
      dontFocus={true}
      {...{errors, boxShadowWidth}}
      ref={register}
    />
    <Input
      type='password'
      name='repeatPassword'
      label='Repeat password'
      dontFocus={true}
      {...{errors, boxShadowWidth}}
      ref={register}
    />
    {/* {repeatPasswordErr()} */}
    {/* <Checkbox>
      Subscribe to Solvio Monthly
    </Checkbox> */}
    <Button primary width='150px' type='submit'>
      Sign up
    </Button>
    <AuthOptions first={{
      link: `/signup`,
      text: `Use social`
    }} />
  </form>
}

export default H.styled (Email) ``
