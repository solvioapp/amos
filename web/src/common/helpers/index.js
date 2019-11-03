import {R} from 'common'
import {importContext} from './generic'
import * as common from 'repoCommon/helpers'

/* Matches "everything" except ./index.js */
const local = require.context (`.`, true, /\.\/(?!index).+\.js/)
  |> importContext

const toReturn = R.merge (common) (local)

toReturn |> console.log ('toReturn', #)

export default toReturn
