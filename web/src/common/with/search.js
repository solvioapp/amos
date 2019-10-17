import {React, gql, R, H, useForm, useQuery} from 'common'

export const

QUERY_SEARCH = gql`
  query Autocomplete($str: String!) {
    autocomplete (str: $str, first: 3) {
      name
    }
  }
`,

withSearch = C => ({...rest}) => {
  const

  {watch, register} = useForm(),
  {topics} = watch(),

  skip = R.complement (H.isNotNilOrEmpty) (topics),

  {data} = useQuery (QUERY_SEARCH, {variables: {str: topics}, skip}),

  results = data
    ? R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
    : null,

  onEnt = H.navto (`/t/${topics}`)

  results |> console.log ('results', #)

  return (
    <C {...rest} {...{onEnt, results, register}} />
  )
}