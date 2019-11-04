import {importContext} from 'repoCommon/helpers'

/* Matches "everything" except ./index.js */
export default require.context (`.`, true, /\.\/(?!index).+\.js/)
  |> importContext
