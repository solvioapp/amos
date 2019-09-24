// import AmosChat from 'components/amos-chat'
// import AuthBox from 'components/auth-box'
// import Top_ from './top.sc'
import React, {useRef} from 'react'
import Input from 'components/Input'
import {useMutation} from '@apollo/react-hooks'
import * as R from 'ramda'
import Button from 'components/button'
import {gql} from 'apollo-boost'
// import {Redirect} from 'react-router-dom'
import {navto} from 'common/history'

// const messages = [
//   `👋 I'm Amos. I was created to be 'the best learning mentor in the world'.`,
//   `For now I'm trying to sort the web's learning resources. Then in the future I'll be able to show you learning paths on any topic, tailored to your requirements.`,
//   `So I need your help! Create an account and submit reviews for your favorite learning resources. Vamos, amigo! 🤗`,
// ]

// const SEARCH = gql`
//   query {
//     Topic(name: $name) {
//       search()
//     }
//   }
// `

const Guest = ({...rest}) => {
  // const [search, other] = useMutation (SEARCH)
  // other |> console.log('other', #)

  const inputEl = useRef (null)

  const handleSearch = () => {
    navto (`/t/${inputEl.current.value}`) ()
  }
  
  /**
   * @description Allow to handle submissions with Enter key
   */
  const onPress = R.when (R.propEq (`key`) (`Enter`)) (handleSearch)
  
  return (
    <>
      <Input onKeyPress={e => onPress(e)} ref={inputEl} {...rest} />
      <Button onClick={handleSearch}>
        Search
      </Button>
    </>
  )
}

// <Top_ columns={'two'} {...rest}>
//   <AmosChat avatar={'large'}>
//     {messages}
//   </AmosChat>
//   <AuthBox/>
// </Top_>

export default Guest
