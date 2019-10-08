import {
  React, R, yup, useForm, connect, CONST, H
} from 'common'
import Form from './form'

const defMessage = ({isSubmitted}) => (
  isSubmitted ? `Looks good, let's get started!` : `Welcome back! 🎊`
)

const validationSchema = yup.object().shape ({
  usernameOrEmail: yup.string().required(),
  password: yup.string().min(6).required(),
})

const Login = ({login: [login, {data}]}) => {
  const {register, errors: formErrors, formState, handleSubmit} = useForm ({validationSchema})

  const onSubmit = handleSubmit (input => {
    const variables = {input: R.pick ([`usernameOrEmail`, `password`]) (input)}
    login ({variables})
  })

  const queryError = data && (data.success ? {} : {query: {message: data.login.message}})
  const errors = R.merge (formErrors) (queryError)

  const messages = H.getMessages (defMessage (formState)) (errors)

  return (
    <Form {...{onSubmit, messages, register, errors}}/>
  )
}

export default connect.LOGIN (Login)
