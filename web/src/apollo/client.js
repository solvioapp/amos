import {
  ApolloClient, H, Cookies
} from 'common'
import resolvers from 'apollo/resolvers'
import _cache from './cache'

const

uri = `${window._env_.CUSTOM_API_URL}`,

[onResetStore, cache] = _cache(),

request = op => {
  const auth = (new Cookies()).get (`auth`)
  H.isNotNilOrEmpty (auth) && (() => (
    op.setContext ({headers: {authorization: `Bearer ${auth}`}}))()
  )
},

client = new ApolloClient({
  resolvers,
  uri,
  cache,
  request,
})

client.onResetStore (onResetStore)

export default client
