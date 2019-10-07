// import AmosChat from 'components/amos-chat'
// import AuthBox from 'components/auth-box'
// import Top_ from './top.sc'
import {
  React, useState, useQuery, R, gql, navto,
  Input
} from 'common'

// const messages = [
//   `👋 I'm Amos. I was created to be 'the best learning mentor in the world'.`,
//   `For now I'm trying to sort the web's learning resources. Then in the future I'll be able to show you learning paths on any topic, tailored to your requirements.`,
//   `So I need your help! Create an account and submit reviews for your favorite learning resources. Vamos, amigo! 🤗`,
// ]

// const debug = fn => R.converge (R.prop (`1`), [console.log, fn])

// R.pipe
//   e |> console.log ('e', #) && fn (e)
// }

const QUERY_SEARCH = gql`
  query Autocomplete($string: String!) {
    autocomplete (string: $string, first: 3) {
      name
    }
  }
`

const Guest = ({...rest}) => {
  const [input, setInputObj] = useState (``)
  const {data} = useQuery (QUERY_SEARCH, {variables: {string: input}})
  const setInput = ({target: {value: val}}) => setInputObj (val)

  /* If data is undefined or input is empty, return null */
  const results = data
    ? (R.isEmpty (input)
      ? null
      : R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
    ) : null

  // /* Can't use point-free coding because it would bind it to inputEl (see closures) */
  const handleSearch = navto (`/t/${input}`)

  return (
    <>
      <Input onChange={setInput} onEnt={handleSearch} results={results} {...rest} />
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
