import 'regenerator-runtime/runtime'
import server from './server'

console.log (`NEO4J_URI`, process.env.NEO4J_URI)
console.log (`NEO4J_USERNAME`, process.env.NEO4J_USERNAME)
console.log (`NEO4J_PASSWORD`, process.env.NEO4J_PASSWORD)

const app = server(),
PORT = process.env.GRAPHQL_PORT || process.env.PORT

app.listen (PORT, () => {
  console.log (`GraphQL Server ready at ${PORT} 🚀`)
})
