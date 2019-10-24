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
    return {topic: H.update (config.key) (_results) (results.topic)}
  },

  /* If input is empty (signified by config.skip) set results to empty array */
  [] = [
    config.skip && H.isNotNilOrEmpty (results?.topic?.[config.key])
      && setResults ({topic: H.update (config.key) ([]) (results.topic)})
  ],

  onCompleted = R.pipe (parseResults, setResults),

  _config = {
    /* Pick only those keys that apollo cares about */
    ...R.pick ([`variables`, `skip`]) (config),
    /* ...And add onCompleted */
    onCompleted
  },
  {loading} = useQuery (QUERY_SEARCH, _config)

  return R.merge ({results, loading}) (props)
}

export default results