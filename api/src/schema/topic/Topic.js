// import {R} from 'common'

// /* Need to override this resolver bc o/w can't return [Resource!]! */
// const Topic = async (_, {name, _id}, {driver}) => {
//   const ses = driver.session()
//   const _1 = `
//   match (t:Topic {name: $name})
//   return t
//   `

//   const {records: recs} = await ses.run (_1, {name})

//   const toReturn = R.map (rec => rec.get (`t`)) (recs)
//   // const toReturn = recs[0].get (`t`).properties
//   toReturn |> console.log('toReturn Topic', #)
//   return toReturn
// }

// export default Topic