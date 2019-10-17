import {R, H} from 'common'

const

queries = require.context (`.`, true, /\.\/Query\/.+\.js$/),
mutations = require.context (`.`, true, /\.\/Mutation\/.+\.js$/),
responses = require.context (`.`, true, /\.\/Response\/.+\.js$/)

export default {
  Query: queries |> H.importContext |> R.mergeAll,
  Mutation: mutations |> H.importContext |> R.mergeAll,
  Response: responses |> H.importContext |> R.mergeAll,
}
