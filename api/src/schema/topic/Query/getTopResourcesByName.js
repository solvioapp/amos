import {R} from 'common'

const _1 = `
match (r: Resource)
-[:HAS_TOPIC]->(t: Topic)
where $name in t.names
with r
return r
`

const getTopResourcesByName = async (_, {name}, {session}) => {
  const {records: resources} = await session.run (_1, {name})
  const results = R.map (r => ({
    ...r.get (`r`).properties,
    _id: r.get (`r`).identity.low
  })) (resources)
  results |> console.log ('results', #)
  return results
}

export default (getTopResourcesByName)