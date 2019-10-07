import {
  React,
  AmosChat, AuthOptions
} from 'common'
import Form from './form'
import Top_ from '../top.sc'

const Email = ({login, ...rest}) => {
  // data |> console.log ('data', #)
  // error |> console.log ('error', #)

  // const repeatPasswordErr = () => R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'> R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'></AmosChat> R.equals (password) (repeatPassword) ? null : <AmosChat avatar='none'></AmosChat>
  //         Hey, the passwords don't seem to match. Good we caught that now!
  //       </AmosChat>

  const repeatPasswordErr = () => null

  // const form = useRef()
  // const validForm = form.current ? !repeatPasswordErr : false

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
      <Form />
      <AuthOptions first={{
        link: `/sign-up`,
        text: `Use social`
      }} />
    </Top_>
  )
}

export default Email
