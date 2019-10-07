import {R, ApolloClient, gql, fetch, HttpLink, InMemoryCache, Promise, parser, topics} from './common'

const

[uri] = R.props 
  ([`API_URL`])
  (process.env),

client = new ApolloClient ({
  link: new HttpLink ({uri, fetch}),
  cache: new InMemoryCache()
}),

  // createTopic (input: CreateTopicInput!): Boolean!
  // addIsPartOf (input: AddIsPartOfInput!): Boolean!

createTopicMutation = gql`
  mutation CreateTopic ($input: CreateTopicInput!) {
    createTopic (input: $input)
  }
`,

addIsPartOfMutation = gql`
  mutation AddIsPartOf ($input: AddIsPartOfInput!) {
    addIsPartOf (input: $input)
  }
`,

// const createRange = arr => R.range (0) (R.length (arr))

createTopic = async ({metadata: {names}}) => {
  await client.mutate ({mutation: createTopicMutation, variables: {input: {names}}})
},

createRelation = async ({child, parent}) => {
  await client.mutate ({mutation: addIsPartOfMutation, variables: {input: {child, parent}}})
}

export default async () => {
  const parsed = parser (topics)
  await Promise.mapSeries (parsed.graph.nodes, createTopic)
  console.log (`Successfully seeded nodes`)
  await Promise.mapSeries (parsed.graph.edges, createRelation)
  console.log (`Successfully seeded relations`)
}
