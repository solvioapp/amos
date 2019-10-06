import {R, ApolloClient, gql, fetch, HttpLink, InMemoryCache, Promise, parser, topics} from './common'

const

[uri] = R.props 
  ([`API_URL`])
  (process.env),

client = new ApolloClient ({
  link: new HttpLink ({uri, fetch}),
  cache: new InMemoryCache()
}),

createTopicMutation = gql`
  mutation CreateTopic($name: String!, $names: [String!]!) {
    createTopic(name: $name, names: $names)
  }
`,

createRelationMutation = gql`
  query CreateRelation($source: String!, $target: String!) {
    Topic (name: $source) {
      createLink (name: $target)
    }
  }
`,

// const createRange = arr => R.range (0) (R.length (arr))

createTopic = async ({metadata: {names}}) => {
  await client.mutate ({mutation: createTopicMutation, variables: {name: names[0], names}})
},

createRelation = async ({source, target}) => {
  await client.mutate ({mutation: createRelationMutation, variables: {source, target}})
}

export default async () => {
  const parsed = parser (topics)
  await Promise.mapSeries (parsed.graph.nodes, createTopic)
  console.log (`Successfully seeded nodes`)
  await Promise.mapSeries (parsed.graph.edges, createRelation)
  console.log (`Successfully seeded relations`)
}
