import {
  React, useState, useMemo, useRef, R, useMutation, gql, H,
  AmosChat, Button, Input, Checkbox, AuthOptions
} from 'common'
import Top_ from '../top.sc'

const getTargetValue = R.path ([`target`, `value`])
const pipeTValueTo = cb => R.pipe (getTargetValue, cb)

const SIGNUP = gql`
  mutation Signup ($username: String!, $email: String!, $password: String!) {
    signup (username: $username, email: $email, password: $password)
  }
`

const Email = ({login, ...rest}) => {
  const [username, setUsernameObj] = useState (``)
  const setUsername = ({target: {value: val}}) => setUsernameObj (val)
  const [email, setEmailObj] = useState (``)
  const setEmail = ({target: {value: val}}) => setEmailObj (val)
  const [password, setPasswordObj] = useState (``)
  const setPassword = ({target: {value: val}}) => setPasswordObj (val)
  const [repeatPassword, setRepeatPasswordObj] = useState (``)
  const setRepeatPassword = ({target: {value: val}}) => setRepeatPasswordObj (val)

  const [signupAux, {loading, data}] = useMutation (SIGNUP)

  username |> console.log ('username', #)
  const signup = e => {
    e.preventDefault()
    e |> console.log ('e', #)
    signupAux ({variables: {username, email, password}})
  }

  // const repeatPasswordErr = useMemo(() => password && repeatPassword && password !== repeatPassword && `Passwords must match`,
  //  [password, repeatPassword])

  const repeatPasswordErr = () => R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'>
          Hey, the passwords don't seem to match. Good we caught that now!
        </AmosChat>

  const form = useRef()
  // const validForm = form.current ? !repeatPasswordErr : false
  const validForm = true 

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
      <form onSubmit={signup} ref={form}>
        <Input type='username' onChange={setUsername} required>
          Username
        </Input>
        <Input type='email' onChange={setEmail} required>
          Email
        </Input>
        <Input type='password' onChange={setPassword} required minLength='6'>
          Password
        </Input>
        <Input type='password' onChange={setRepeatPassword} required minLength='6'>
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
