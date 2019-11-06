import {R} from 'common'
import * as common from 'repoCommon/helpers'

/* Matches "everything" except ./index.js */
const local = require.context (`.`, true, /\.\/(?!index).+\.js/)
  |> common.importContext

export default R.merge (common) (local)
