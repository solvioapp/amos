import {
  InMemoryCache, ApolloClient, H, R, Cookies
} from 'common'
import resolvers from 'apollo/resolvers'

const

uri = `${window._env_.CUSTOM_API_URL}`,

cache = new InMemoryCache(),

client = new ApolloClient({
  uri,
  cache,
  request: op => {
    const auth = (new Cookies()).get (`auth`)
    H.isNotNilOrEmpty (auth) && (() => (
      op.setContext ({headers: {authorization: `Bearer ${auth}`}}))()
    )
  },
  resolvers,
}),

defaultData = {isAuthenticated: false},

auth = (new Cookies()).get (`auth`),

initialDataFragment =
  H.isNotNilOrEmpty (auth)
    ? {isAuthenticated: true}
    : {},

initialData = R.merge (defaultData) (initialDataFragment)

cache.writeData ({data: initialData})

client.onResetStore (() => cache.writeData ({data: defaultData}))

export default client
