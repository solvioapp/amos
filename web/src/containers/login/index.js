import {
  React, R, yup, useForm, Redirect, CONST, gql, useLazyQuery,
  AmosChat, AuthOptions, Button, Input
} from 'common'
import Form from './form.sc'
import Link from './link.sc'
import connect from './connect'

const url = R.pathOr(`/`, [`state`, `from`])

const defMessage = ({isSubmitted}) => (
  isSubmitted ? `Looks good, let's get started!` : `Welcome back! 🎊`
)

const validationSchema = yup.object().shape ({
  // email: yup.string().email(CONST.email).required(),
  password: yup.string().min(6).required(),
})

const LOGIN = gql`
  query Login ($input: LoginInput!) {
    login (input: $input) {
      success
      message
      login @client
    }
  }
`

const Login = (props) => {
  const {location, isAuthenticated} = props
  const {register, errors, formState, handleSubmit} = useForm ({validationSchema})

  const [loginAux, {data, error}] = useLazyQuery (LOGIN)
  const onSubmit = handleSubmit (input => {
    const variables = R.objOf (`input`) (R.pick ([`usernameOrEmail`, `password`]) (input))
    loginAux ({variables})
  })
  data |> console.log ('data login', #)
  error |> console.log ('error login', #)

  const getMessages = R.pipe(
    // R.merge(props.errors),
    R.values,
    R.pluck (`message`),
    R.when (
      R.isEmpty,
      R.append(defMessage (formState)),
    )
  )

  if (isAuthenticated) {
    return <Redirect to={url (location)}/>
  }

  return (
    <Form onSubmit={onSubmit}>
      <AmosChat>
        {getMessages(errors)}
      </AmosChat>
      <Input
        hasError={errors.email}
        label='Username or email'
        name='usernameOrEmail'
        placeholder='Username or email'
        ref={register ({required: true})}
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
          link: `/signup`,
          text: `Use social`
        }}
        second={{
          link: `/signup/email`,
          text: `Sign up`
        }}
      />
    </Form>
  )
}

export default Login
