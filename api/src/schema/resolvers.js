import {H} from 'common'

const cache = H.req (__dirname) (`.`) (/\.\/.+\/resolvers\.js$/) (true)

export default H.mergeDeepAll (cache)

