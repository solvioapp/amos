import {R} from 'common'

const 

_1 = `
  merge (t:Topic {name: $name, names: $names, _id: $_id})
  return t
`,

createTopic = async (_, {name, names, _id}, {driver}) => {
  const ses = driver.session()
  const {records: recs} = await ses.run (_1, {name, names, _id})

  const toReturn = R.nth (0) (R.map (rec => rec.get (`t`).properties) (recs))
  toReturn |> console.log ('toReturn', #)
  return toReturn
}

export default createTopic