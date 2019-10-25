import {R, H, ApolloClient, gql, fetch, HttpLink, InMemoryCache, Promise, reviews} from './common'

const

{hackprague, others, goodreads} = reviews,

[uri] = R.props 
  ([`API_URL`])
  (process.env),

client = new ApolloClient ({
  link: new HttpLink ({uri, fetch}),
  cache: new InMemoryCache()
}),

mutation = gql`
  mutation AddReview($input: AddReviewHydrationInput!) {
    addReviewHydration(input: $input) {
      success
    }
  }
`,

createReview = async (rev) => {
  // JSON.stringify (rev) |> console.log ('JSON.stringify (rev)', #)
  await client.mutate ({mutation, variables: {input: rev}})
},

createHackPragueReview = async (rev) => {
  // JSON.stringify (rev) |> console.log ('JSON.stringify (rev)', #)
  const _rev = R.omit ([`prerequisites`]) (H.renameKeys ({urls: `url_main`}) (rev))
  await client.mutate ({mutation, variables: {input: _rev}})  
}

export default async () => {
  console.log (`Creating HackPrague reviews`)
  // await Promise.mapSeries (R.slice (0) (100) (hackprague), createHackPragueReview)
  await Promise.mapSeries (hackprague, createHackPragueReview)
  console.log (`Successfully created HackPrague reviews`)

  console.log (`Creating Other reviews`)
  // await Promise.mapSeries (R.slice (0) (100) (others), createReview)
  await Promise.mapSeries (others, createReview)
  console.log (`Successfully created Other reviews`)

  console.log (`Creating Goodreads reviews`)
  // await Promise.mapSeries (R.slice (0) (100) (goodreads), createReview)
  await Promise.mapSeries (goodreads, createReview)
  console.log (`Successfully created Goodreads reviews`)

}
