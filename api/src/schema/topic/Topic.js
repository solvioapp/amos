import {R} from 'common'

const _1 = `
  match (t:Topic)
  where id(t) = toInteger($_id)
  return t
`

/* Need to override this resolver bc o/w can't return [Resource!]! */
const Topic = async (_, {_id}, {session}) => {
  const {records: recs} = await session.run (_1, {_id})

  const toReturn = R.map (rec => rec.get (`t`)) (recs)
  // const toReturn = recs[0].get (`t`).properties
  toReturn |> console.log('toReturn Topic', #)
  return toReturn
}

export default Topic