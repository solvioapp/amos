import {R, H} from 'common'

/* Matches "everything" except ./index.js */
export default require.context (`.`, true, /\.\/(?!index).+\.js/)
  |> H.importContext
  |> R.mergeAll
