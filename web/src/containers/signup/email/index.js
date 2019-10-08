import {
  R, H, React, useForm, connect, yup
} from 'common'
import _Form from './form'

const defMessage = ({isSubmitted}) => (
  isSubmitted ? `Looks good, let's get started!` : `Welcome back! 🎊`
)

const validationSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
})

const Form = ({signup: [signup, {data}]}) => {
  const {handleSubmit, register, formState, errors: formErrors} = useForm ({validationSchema})

  const onSubmit = handleSubmit (input => {
    const variables = {input: (R.pick ([`username`, `email`, `password`]) (input))}
    signup ({variables})
  })

  const validForm = true

  const queryError = data && (data.success ? {} : {query: {message: data.signup.message}})
  const errors = R.merge (formErrors) (queryError)

  errors |> console.log ('errors', #)

  const messages = H.getMessages (defMessage (formState)) (errors)

  return (
    <_Form {...{onSubmit, messages, register, errors, validForm}} />
  )
}

export default connect.SIGNUP (Form)