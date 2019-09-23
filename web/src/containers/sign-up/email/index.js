import AmosChat from 'components/amos-chat'
import Button from 'components/button'
import connect from './connect'
import Input from 'components/input'
import Checkbox from 'components/checkbox'
import Top_ from '../top.sc'
import React, {useState, useMemo, useRef} from 'react'
import AuthOptions from 'components/auth-options'
import * as R from 'ramda'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const getTargetValue = R.path ([`target`, `value`])
const pipeTValueTo = cb => R.pipe (getTargetValue, cb)

const Email = ({login, ...rest}) => {
  const [username, setUsername] = useState (``)
  const [email, setEmail] = useState (``)
  const [password, setPassword] = useState (``)
  const [repeatPassword, setRepeatPassword] = useState (``)
  const SIGNUP = gql`
    mutation {
      signup(username: "hi", email: "hello", password: "how are you")
    }
  `
  const [signup, {loading, data}] = useMutation (SIGNUP)

  const signupUser = event => {
    event.preventDefault()

    const userData = {email, password}
    console.log(`Signing up user`, userData)
  }

  const repeatPasswordErr = useMemo(() => {
    return password && repeatPassword && password !== repeatPassword && `Passwords must match`
  }, [password, repeatPassword])

  const form = useRef()
  const validForm = form.current ? !repeatPasswordErr : false

  return (
    <Top_ {...rest}>
      <AmosChat>
        Sign up to help me sort the world's learning resources. Did I say it's free? 😌
      </AmosChat>
      <form onSubmit={signupUser} ref={form}>
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
        {repeatPasswordErr && <AmosChat avatar='none'>
          Hey, the passwords don't seem to match. Good we caught that now!
        </AmosChat>}
        <Checkbox>
          Subscribe to Solvio Monthly
        </Checkbox>
        <Button primary onClick={signup} width='150px' type='submit' disabled={!validForm}>
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

// export default connect(Email)
export default Email
