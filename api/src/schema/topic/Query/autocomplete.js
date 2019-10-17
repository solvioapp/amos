// const _1 = `
// match (t:Topic)
// unwind t.names as name
// with t, name, toLower (name) as nameLower, toLower ($str) as strLower
// with t, name, strLower, split (nameLower, ' ') as nameWords
// unwind nameWords as word
// with t, name, strLower, word
// where word starts with strLower
// return t,name
// limit $first
// `
const _1 = `
match (t:Topic)
unwind t.names as name
with t, name, toLower (name) as nameLower, toLower ($str) as strLower
where nameLower contains strLower
return t,name
limit $first
`


const autocomplete = async (_, {str, first}, {driver}) => {
  const ses = driver.session()

  const {records: recs} = await ses.run (_1, {str, first})

  recs |> console.log ('recs', #)
  recs[0] |> console.log ('recs[0]', #)
  recs[0].get(`t`) |> console.log ('recs[0].get(`t`)', #)

  const toReturn = recs.map (rec => ({
    topic: {...rec.get (`t`).properties, _id: rec.get (`t`).identity.low},
    name: rec.get (`name`),
  }))
  toReturn |> console.log ('toReturn', #)
  return toReturn
}

export default autocomplete