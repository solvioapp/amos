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

  /* eslint-disable no-shadow */
  [results, setResults] = React.useState ({topics: []}),
  {config, form} = props,
  topics = form.watch (`topic`, []),

  parseResults = data => {
    const _results = data && R.map (res => ({name: res.name, text: res.name})) (data.autocomplete.results[0].results)
    return {topics: H.update (config.key) (_results) ([])}
  },

  onCompleted = R.pipe (parseResults, setResults),
  _config = {...config, onCompleted},

  {loading} = useQuery (QUERY_SEARCH, _config),
  forwardProps = R.merge ({results, loading, topics}) (props)

  return <C {...forwardProps} />
}

export default results