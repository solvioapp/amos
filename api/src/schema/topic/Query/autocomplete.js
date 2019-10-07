const _1 = `
match (t:Topic)
unwind t.names as name
with t, name, toLower (name) as nameLower, toLower ($string) as stringLower
with t, name, stringLower, split (nameLower, ' ') as nameWords
unwind nameWords as word
with t, name, stringLower, word
where word starts with stringLower
return t,name
limit $first
`
// const _1 = `
// match (t:Topic)
// unwind t.names as name
// with t, name, toLower (name) as nameLower, toLower ($string) as stringLower
// where nameLower contains stringLower
// return t,name
// limit $first
// `


const autocomplete = async (_, {string, first}, {driver}) => {
  const ses = driver.session()

  const {records: recs} = await ses.run (_1, {string, first})

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