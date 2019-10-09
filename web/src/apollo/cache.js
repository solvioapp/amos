import {InMemoryCache, H, R, Cookies} from 'common'

const _cache = () => {
  const

  cache = new InMemoryCache(),

  /* Default data */
  defaultData = {isAuthenticated: false},
  onResetStore = () => cache.writeData ({data: defaultData}),

  /* Initial Data */
  auth = (new Cookies()).get (`auth`),
  initialDataFragment =
    H.isNotNilOrEmpty (auth)
      ? {isAuthenticated: true}
      : {},
  initialData = R.merge (defaultData) (initialDataFragment)

  cache.writeData ({data: initialData})

  return [onResetStore, cache]
}

export default _cache