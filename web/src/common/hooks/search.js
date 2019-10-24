import {React, gql, R, H, useForm, useQuery} from 'common'

export const

QUERY_SEARCH = gql`
  query Autocomplete($input: AutocompleteInput!) {
    autocomplete (input: $input) {
      results {
        name
      }
    }
  }
`,

withSearch = C => ({...rest}) => {
  const

  {watch, register} = useForm(),
  {str} = watch(),

  skip = R.complement (H.isNotNilOrEmpty) (str),

  {data} = useQuery (QUERY_SEARCH, {variables: {input: {str, first: 3}}, skip}),

  results = data
    ? R.map (r => ({name: r.name, text: r.name})) (data.autocomplete.results)
    : null,

  onEnt = H.navto (`/t/${str}`)

  return (
    <C {...rest} {...{onEnt, results, register}} />
  )
}