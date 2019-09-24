import * as R from 'ramda'
import ApolloClient from 'apollo-client'
import gql from 'graphql-tag'
import fetch from 'node-fetch'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import reviews from '@solviofoundation/amos-reviews'

const [uri] = R.props 
  ([`API_URL`])
  (process.env)

const client = new ApolloClient ({
  link: new HttpLink ({uri, fetch}),
  cache: new InMemoryCache()
})

const mutation = gql`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input)
  }
`

// const createRange = arr => R.range (0) (R.length (arr))

// TODO: rewrite better
export default async () => {
  for (let i = 0; i < reviews.length; i++) {
    const rev = reviews[i];
    try {
      await client.mutate ({mutation, variables: {input: {
        type: reviews[i][0],
        links: reviews[i][1],
        topics: reviews[i][2],
        prerequisites: reviews[i][3],
      }}})
    } catch (e) {
      throw new Error (`ERROR: ${e}`)
    }
  }
}
