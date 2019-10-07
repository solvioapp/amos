import {R} from 'common'

const 

_1 = `
  merge (t:Topic {names: $names})
  return t
`,

createTopic = async (_, {input}, {session}) => {
  const {records: recs} = await session.run (_1, input)

  const toReturn = R.nth (0) (R.map (rec => rec.get (`t`).properties) (recs))
  toReturn |> console.log ('toReturn', __filename, #)
  return true
}

export default createTopic