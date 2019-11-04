import {
  React, hooks,
  Input, AmosChat
} from 'common'
import top from './top.sc'

const messages = [
  `Watcha interested in? 🤗`
]

const Guest = ({onEnt, results, register, onSubmit, ...rest}) => (
  <form css={top} autocomplete='off' onSubmit={onSubmit}>
    <AmosChat avatar='small'>
      {messages}
    </AmosChat>
    <Input
      name='str'
      link={true}
      onEnt={onEnt}
      results={results}
      ref={register}
      {...rest}
    />
  </form>
)

export default hooks.withSearch (Guest)


// const Guest = ({...rest}) => {
//   const [input, setInputObj] = useState (``)
//   const {data} = useQuery (QUERY_SEARCH, {variables: {string: input}})
//   const setInput = ({target: {value: val}}) => setInputObj (val)

//   /* If data is undefined or input is empty, return null */
//   const results = data
//     ? (R.isEmpty (input)
//       ? null
//       // : R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
//       : R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
//     ) : null

//   const handleSearch = navto (`/t/${input}`)

//   return (
//     <Input
//       onChange={setInput}
//       onEnt={handleSearch}
//       results={results}
//       {...rest}
//     />
//   )
// }

// <Top_ columns={'two'} {...rest}>
//   <AmosChat avatar={'large'}>
//     {messages}
//   </AmosChat>
//   <AuthBox/>
// </Top_>