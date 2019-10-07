import {
  React, useState, useMemo, useRef, useForm, R, useMutation, gql, H,
  AmosChat, Button, Input, Checkbox, AuthOptions
} from 'common'
import Top_ from '../top.sc'

const getTargetValue = R.path ([`target`, `value`])
const pipeTValueTo = cb => R.pipe (getTargetValue, cb)

const SIGNUP = gql`
  mutation Signup ($input: SignupInput!) {
    signup (input: $input)
  }
`

const Email = ({login, ...rest}) => {
  const {register, handleSubmit, errors} = useForm() // initialise the hook
  const [signupAux, {loading, data}] = useMutation (SIGNUP)

  const onSubmit = input => {
    input |> console.log ('input', #)
    signupAux ({variables: {input}})
  }

  // const repeatPasswordErr = useMemo(() => password && repeatPassword && password !== repeatPassword && `Passwords must match`,
  //  [password, repeatPassword])

  const repeatPasswordErr = () => R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'> R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'></AmosChat> R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'></AmosChat>
          Hey, the passwords don't seem to match. Good we caught that now!
        </AmosChat>

  // const form = useRef()
  // const validForm = form.current ? !repeatPasswordErr : false
  const validForm = true;

  // TODO: save credentials
  // TODO: repeatPass only for >= length
  // TODO: Validation (yup)
  // TODO: signup button disabled
  // TODO: Merge 
  // TODO: extract constants

  return (
    <Top_ {...rest}>
      <AmosChat>
        Sign up to help me sort the world's learning resources. Did I say it's free? 😌
      </AmosChat>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {repeatPasswordErr()}
        <Checkbox>
          Subscribe to Solvio Monthly
        </Checkbox>
        <Button primary width='150px' type='submit' disabled={!validForm}>
          Sign up
        </Button>
      </form>
      <AuthOptions first={{
        link: `/sign-up`,
        text: `Use social`
      }} />
    </Top_>
  )
}

export default Email
