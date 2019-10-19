import {R, H, React, useQuery, gql} from 'common'

const

QUERY_SEARCH = gql`
  query Autocomplete($input: [AutocompleteInput!]!) {
    autocomplete (input: $input) {
      results {
        results {
          name
        }
      }
    }
  }
`,

/**
 * @description Sets up Query for Search
 */
results = C => (props) => {
  const

  {form, fields} = props,

  /* Returns an array of values */
  topics = form.watch (`topic`, [])
  /* First time using let in 2 months :) */
  let config
  const createOnChange = key => results => ({target: {name, value}}) => {
    name |> console.log ('name', #)
    value |> console.log ('value', #)
  },

  [] = [fields |> console.log ('fields results', #)],

  onChange = R.map (createOnChange) (fields),

  skip = R.all (H.isNilOrEmpty) (topics),
  /*
    This commented out solution for input is better but we lose the indices
    Leaving this for now, it's a TODO:
  */
  // input = R.reduce ((acc, str) => H.isNilOrEmpty (str) ? acc : ({str, first: 3})) ([]) (topics),
  input = R.map (str => ({str, first: 3})) (topics),
  {data, loading} = useQuery (QUERY_SEARCH, {variables: {input}, skip}),

  [] = [data |> console.log ('data', #)],

  /* eslint-disable no-shadow, indent */
  results = data && R.map
    (res => R.map (_res => ({name: _res.name, text: _res.name})) (res.results))
    (data.autocomplete.results),

  forwardProps = R.merge ({results, topics, onChange, loading}) (props)

  return <C {...forwardProps} />
}

export default results