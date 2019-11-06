import {R} from 'common'
import * as common from 'repoCommon/helpers'

/* Matches "everything" except ./index.js */
const _local = require.context (`.`, true, /\.\/(?!index).+\.js/)
_local |> console.log ('_local', #)
_local.keys() |> console.log ('_local.keys()', #)
const local = common.importContext (_local)

export default R.merge (common) (local)
