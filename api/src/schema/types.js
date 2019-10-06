import {H,R} from 'common'
import {mergeTypes} from 'merge-graphql-schemas'

const cache = H.req (__dirname) (`.`) (/.gql$/) (false)
const all = R.map (H.read (__dirname)) (cache)

export default mergeTypes (all)
