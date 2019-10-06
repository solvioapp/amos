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

export default autocomplete