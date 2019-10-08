import {
  R, H, gql, React, useForm, useMutation, useCookies, yup,
  Button, Input, Checkbox
} from 'common'

const SIGNUP = gql`
  mutation Signup ($input: SignupInput!) {
    signup (input: $input) {
      success
      message
      login @client
    }
  }
`

const Form = ({onSubmit, register, validForm}) => (
  <form onSubmit={onSubmit}>
    <Input type='username' name='username' ref={register} required>
      Username
    </Input>
    <Input type='email' name='email' ref={register} required>
      Email
    </Input>
    <Input type='password' name='password' ref={register} required minLength='6'>
      Password
    </Input>
    <Input type='password' name='repeatPassword' ref={register} required minLength='6'>
      Repeat password
    </Input>
    {/* {repeatPasswordErr()} */}
    <Checkbox>
      Subscribe to Solvio Monthly
    </Checkbox>
    <Button primary width='150px' type='submit' disabled={!validForm}>
      Sign up
    </Button>
  </form>
)

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const connect = C => () => {
  const {register, handleSubmit, errors} = useForm ({validationSchema}) // initialise the hook
  const [signupAux, {data, error, client}] = useMutation (SIGNUP)
  data |> console.log ('data form', #)
  error |> console.log ('error form', #)
  // const [cookies, setCookie] = useCookies ([`auth`])
  // cookies |> console.log ('cookies', #)

  // data && (() => {
  //   data |> console.log ('data', #)
  //   H.isNotEmpty (R.prop (`auth`) (cookies)) && (() => {
  //     setCookie (`auth`, R.prop (`signup`) (data))
  //   })()
  //   client.writeData ({data: {isAuthenticated: true}})
  // })()

  const onSubmit = handleSubmit (input => {
    const variables = R.objOf (`input`) (R.pick ([`username`, `email`, `password`]) (input))
    signupAux ({variables})
  })

  const validForm = true

  return (
    <C {...{onSubmit, register, validForm}} />
  )
}

export default connect(Form)