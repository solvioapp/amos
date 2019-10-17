import {
  ApolloClient, H, Cookies
} from 'common'
import resolvers from 'apollo/resolvers'
import typeDefs from './types'
import initCache from './init-cache'

const

uri = `${window._env_.CUSTOM_API_URL}`,

request = op => {
  // TODO: Read token from cache rather than cookie
  const auth = (new Cookies()).get (`auth`)
  H.isNotNilOrEmpty (auth) && (() => (
    op.setContext ({headers: {authorization: `Bearer ${auth}`}}))()
  )
},

client = new ApolloClient({
  typeDefs,
  resolvers,
  uri,
  request,
})

initCache (client)

export default client
