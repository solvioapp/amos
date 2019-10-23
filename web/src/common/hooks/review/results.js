import {R, H, React, useQuery, gql} from 'common'

const

QUERY_SEARCH = gql`
  query Autocomplete($input: AutocompleteInput!) {
    autocomplete (input: $input) {
      results {
        name
      }
    }
  }
`,

defResults = {topic: []},

/**
 * @description Sets up Query for Search
 */
results = (props) => {
  const

  /* eslint-disable no-shadow */
  [results, setResults] = React.useState (defResults),
  {config} = props,

  parseResults = data => {
    const _results = data
      && R.map (res => ({name: res.name, text: res.name})) (data.autocomplete.results)
    return config.skip // test whether user deleted input
      ? {topic: H.update (config.key) ([]) (results.topic)}
      : {topic: H.update (config.key) (_results) (results.topic)}
  },

  onCompleted = R.pipe (parseResults, setResults),

  _config = {...config, onCompleted},
  {loading} = useQuery (QUERY_SEARCH, _config)

  results |> console.log ('results results.js', #)
  return R.merge ({results, loading}) (props)
}

export default results