import {R, H, React, useQuery, gql} from 'common'

const

GET_REVIEW_CLIENT_GQL = gql`
  query {
    review @client {
      links
      topics
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

  // TODO: Change to false
  {data: {review}} = useQuery (GET_REVIEW_CLIENT_GQL, {returnPartialData: true}),

  [] = [H.useMount(() => {
    R.mapObjIndexed
      (R.pipe (
        R.nthArg (1),
        key => form.setValue (key, review[key])
      ))
      (review)
  })]

  review |> console.log ('review', #)

  return R.merge ({review}) (props)
}

export default hydrate