import {R, H, React, useQuery, gql} from 'common'

const

QUERY_SEARCH = topics => gql([`
  query Autocomplete($str: String!) {
    autocomplete (str: $str, first: 3) {
      name
    }
  }
`]),

/**
 * @description Sets up Query for Search
 */
results = C => (props) => {
  const

  {form, fields} = props,

  topics = form.watch()[fields],

  skip = H.isNilOrEmpty (topic),
  {data, loading} = useQuery (QUERY_SEARCH, {variables: {str: topic}, skip}),

  /* eslint-disable no-shadow */
  results = data
    ? R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
    : null,

  forwardProps = R.merge ({results, topic, loading}) (props)

  return <C {...forwardProps} />
}

export default results