import {R, ApolloClient, gql, fetch, HttpLink, InMemoryCache, Promise, reviews} from './common'

const

{hackprague, others} = reviews,

[uri] = R.props 
  ([`API_URL`])
  (process.env),

client = new ApolloClient ({
  link: new HttpLink ({uri, fetch}),
  cache: new InMemoryCache()
}),

mutation = gql`
  mutation AddReview($input: AddReviewInput!) {
    addReview(input: $input)
  }
`,

createReview = async (rev) => {
  await client.mutate ({mutation, variables: {input: rev}})
}

export default async () => {
  console.log (`Creating HackPrague reviews`)
  await Promise.mapSeries (hackprague, createReview)
  console.log (`Successfully created HackPrague reviews`)
  console.log (`Creating Other reviews`)
  await Promise.mapSeries (others, createReview)
  console.log (`Successfully created Other reviews`)
  // console.log (`Creating Goodreads reviews`)
  // await Promise.mapSeries (goodreads, createReview)
  // console.log (`Successfully created Godoreads reviews`)

}
