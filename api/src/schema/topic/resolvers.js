import {R} from '../../common'

const getTopResources = async ({name}, _, {driver}) => {
  // tops |> console.log('tops', #)
  // const name = tops[0].name
  name |> console.log('name', #)
  const ses = driver.session()
  // TODO: remove imperative
  const _1 = `
  match (t {name: $name})
  <-[:FOR_TOPIC]->
  (a:AmosGame)-[:FOR_RESOURCE]->(r:Resource)
  return r
  `

  const {records: recs} = await ses.run (_1, {name})

  /* recs is an array of weird stuff */
  // recs |> console.log('recs', #)
  // const objs = R.map (rec => rec.toObject()) (recs)
  // objs |> console.log('objs', #)
  return R.map (rec => rec.get (`r`).properties) (recs)
  // rs |> console.log('rs', #)
  // const props = R.map (r => r.properties) (rs)
}

const getChildrenRec = async (_, {name, level}, {driver}) => {
  const ses = driver.session()
  const _1 = 
  `MATCH (t:Topic {name: $name})
  <-[:IS_PART_OF*1..$level]-
  (t:Topic)
  RETURN `

  // await ses.run()
}

/* Need to override this resolver bc o/w can't return [Resource!]! */
const Topic = async (_, {name}, {driver}) => {
  const ses = driver.session()
  const _1 = `
  match (t:Topic {name: $name})
  return t
  `

  const {records: recs} = await ses.run (_1, {name})

  const toReturn = R.map (rec => rec.get (`t`).properties) (recs)
  // const toReturn = recs[0].get (`t`).properties
  toReturn |> console.log('toReturn', #)
  return toReturn
}

const autocomplete = async (_, {string, first}, {driver}) => {
  const ses = driver.session()
  const _1 = `
  match (t:Topic)
  unwind t.names as name
  with t,name
  where name contains $string
  return t,name
  limit $first`

  const {records: recs} = await ses.run (_1, {string, first})

  const toReturn = recs.map (rec => ({
    topic: rec.get (`t`).properties,
    name: rec.get (`name`),
  }))
  toReturn |> console.log ('toReturn', #)
  return toReturn
}

export default {
  Mutation: {},
  Topic: {getTopResources, getChildrenRec},
  Query: {autocomplete},
}