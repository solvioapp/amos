import {R, H, React, useQuery, gql, flatten} from 'common'

const

GET_REVIEW_CLIENT_GQL = gql`
  query {
    review @client {
      links
      topic
      prerequisites
    }
  }
`,

/* eslint-disable indent */
/**
 * @description Hydrates inputs on mount
 */
hydrate = (props) => {

  const

  {form} = props,
  // [valid, setValid] = React.useState ([]),

  // TODO: Change to false
  {data: {review}} = useQuery (GET_REVIEW_CLIENT_GQL, {returnPartialData: true})

  H.useMount(() => {
    review && (review |> flatten |> R.mapObjIndexed ((val, key) => form.setValue (key, val)) (#))
  })

  return R.merge ({review}) (props)
}

export default hydrate