import {R} from 'common'

const _1 = `
match (t:Topic)
<-[:FOR_TOPIC]->
(a:AmosGame)-[:FOR_RESOURCE]->(r:Resource)
where $name in t.names
with r
return r
`

const getTopResources = async (parent, _, {session}) => {
  parent |> console.log ('parent', #)
  // tops |> console.log('tops', #)
  // const name = tops[0].name
  // name |> console.log('name', #)

  const name = parent.properties.names[0]


  const {records: recs} = await session.run (_1, {name})

  /* recs is an array of weird stuff */
  // recs |> console.log('recs', #)
  // const objs = R.map (rec => rec.toObject()) (recs)
  // objs |> console.log('objs', #)
  recs |> console.log ('recs', #)
  const toReturn = R.map (rec => rec.get (`r`).properties) (recs)
  toReturn |> console.log ('toReturn', #)
  return toReturn
  // rs |> console.log('rs', #)
  // const props = R.map (r => r.properties) (rs)
}

export default getTopResources