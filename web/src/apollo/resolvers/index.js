import {R, H} from 'common'

const

queries = require.context (`.`, true, /\.\/Query\/.+\.js$/),
mutations = require.context (`.`, true, /\.\/Mutation\/.+\.js$/),
responses = require.context (`.`, true, /\.\/Response\/.+\.js$/)

queries |> console.log ('queries', #)
mutations |> console.log ('mutations', #)
responses |> console.log ('responses', #)

queries |> H.importContext |> console.log ('queries', #)
mutations |> H.importContext |> console.log ('mutations', #)
responses |> H.importContext |> console.log ('responses', #)

const Response = responses |> H.importContext,
Query = queries |> H.importContext,
Mutation = mutations |> H.importContext

R.map (f => console.log (f.toString())) (Response) |> console.log ('Response', #)
R.map (f => console.log (f.toString())) (Query) |> console.log ('Query', #)
R.map (f => console.log (f.toString())) (Mutation) |> console.log ('Mutation', #)

export default {
  Query,
  Mutation,
  Response,
}
