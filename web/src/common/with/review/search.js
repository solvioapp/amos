import {R, H, React, useQuery, gql} from 'common'

const

QUERY_SEARCH = gql`
  query Autocomplete($str: String!) {
    autocomplete (str: $str, first: 3) {
      name
    }
  }
`,

/**
 * @description Sets up Query for Search
 */
withReviewSearch = C => (props) => {
  const

  {form, fields} = props,

  topic = form.watch()[fields[0]],

  skip = R.complement (H.isNotNilOrEmpty) (topic),
  {data, loading} = useQuery (QUERY_SEARCH, {variables: {str: topic}, skip}),

  results = data
    ? R.map (r => ({name: r.name, text: r.name})) (data.autocomplete)
    : null,

  forwardProps = R.merge ({results, topic, loading}) (props)

  return <C {...forwardProps} />
}

export default withReviewSearch