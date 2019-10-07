import {
  React, R, yup, useForm, Redirect, CONST,
  AmosChat, AuthOptions, Button, Input
} from 'common'
import Form from './form.sc'
import Link from './link.sc'
import connect from './connect'

const url = R.pathOr(`/`, [`state`, `from`])

const defMessage = ({isSubmitted}) => (
  isSubmitted ? `Looks good, let's get started!` : `Welcome back! 🎊`
)

const validationSchema = yup.object().shape({
  email: yup.string().email(CONST.email).required(),
  password: yup.string().min(6).required(),
})

function LogIn(props) {
  const {location, isAuthenticated, authorize} = props
  const {register, errors, formState, handleSubmit} = useForm({validationSchema})

  const getMessages = R.pipe(
    // R.merge(props.errors),
    R.values,
    R.pluck(`message`),
    R.when(
      R.isEmpty,
      R.append(defMessage(formState)),
    )
  )

  if (isAuthenticated) {
    return <Redirect to={url(location)}/>
  }

  return (
    <Form onSubmit={handleSubmit(authorize)}>
      <AmosChat>
        {getMessages(errors)}
      </AmosChat>
      <Input
        hasError={errors.email}
        label='Email'
        name='email'
        placeholder='Email'
        ref={register({required: true})}
      />
      <Input
        hasError={errors.password}
        label='Password'
        name='password'
        placeholder='Password'
        type='password'
        ref={register}
      />
      {/* <Link to='/forgot-password'>Forgot password</Link> */}
      <Button primary type='submit'>
        Log in
      </Button>
      <AuthOptions
        first={{
          link: `/sign-up`,
          text: `Use social`
        }}
        second={{
          link: `/sign-up/email`,
          text: `Sign up`
        }}
      />
    </Form>
  )
}

export default connect(LogIn)
