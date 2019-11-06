import {H, R} from 'common'

const ___exports = H.context (__dirname) (`.`) (/\.\/.+\/resolvers\.js$/)
// ___exports.keys() |> console.log ('___exports.keys()', #)
const __exports = ___exports |> H.importContext
// __exports |> console.log ('__exports', #)
const _exports = __exports |> R.prop (`resolvers`) (#)
_exports |> console.log ('_exports', #)
// const exports = _exports |> H.mergeDeepAll
// exports |> console.log ('exports', #)

export default _exports
