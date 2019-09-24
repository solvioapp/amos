import {R,neo4jgraphql} from '../../common'

export default {
  Mutation: {
    // createTopic: async (_, args, ctx) => {
    //   `createTopic called` |> console.log('`createTopic called`', #)
    // }
  },
  Topic: {
    getTopResources: async ({name}, _, {driver}) => {
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
    },
    getChildrenRec: async (_, {name, level}, {driver}) => {
      const ses = driver.session()
      const _1 = 
      `MATCH (t:Topic {name: $name})
      <-[:IS_PART_OF*1..$level]-
      (t:Topic)
      RETURN `
    }
  },
  Query: {
    /* Need to overwrite this resolver bc o/w can't return [Resource!]! */
    Topic: async (_, {name}, {driver}) => {
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
    },
    autocomplete: async (_, {name}, {driver}) => {
      const ses = driver.session()
      // const _1 =
      // `MATCH (t:Topic)
      // WHERE t.name STARTS WITH $name
      // RETURN t.name as name`
      const _1 = `
      match (t:Topic)
      unwind t.names as name
      with t,name
      where name contains $name
      return t,name`
      
      const {records: recs} = await ses.run (_1, {name})

      return recs.map (rec => rec.get(`name`))
    },
  }
}