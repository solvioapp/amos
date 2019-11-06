import {H, R} from 'common'

const exports = H.req (__dirname) (`.`) (/\.\/.+\/resolvers\.js$/)
  |> R.prop (`resolvers`) (#)
  |> R.merge

export default exports
