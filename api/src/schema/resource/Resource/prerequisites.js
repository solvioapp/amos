import {R, H} from 'common'

const getPrerequisites = `
match (r: Resource)-[h:HAS_PREREQUISITE]->(ag: AmosGame)-[:FOR_TOPIC]->(t: Topic)
where id (r) = toInteger ($resourceId)
return r,ag,t
`

const prerequisites = async ({_id}, _, {session}) => {
  const {records} = await session.run (getPrerequisites, {resourceId: _id})
  const amosGames = R.map (rec => rec.get (`ag`).properties) (records)
  const topics = R.map (rec => rec.get (`t`).properties) (records)
  const _amosGames = R.map (H.over (`level`) (R.prop (`low`))) (amosGames)
  const __amosGames = R.map (H.over (`strength`) (R.prop (`low`))) (_amosGames)
  const toReturn = R.zipWith ((ag, t) => ({...ag, topic: t})) (__amosGames) (topics)
  toReturn |> console.log ('toReturn', #)
  return toReturn
}

export default (prerequisites)