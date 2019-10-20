import {H, R} from 'common'

const 

_1 = `
  match (p)
  where $parent in p.names
  with p
  match (c)
  where $child in c.names
  with p,c
  create (p)<-[:IS_PART_OF]-(c)
  return c 
`,

addIsPartOf = async (_, {input}, {session}) => {
  const {records: recs} = await session.run (_1, input)

  // const toReturn = R.nth (0) (R.map (rec => rec.get (`c`).properties) (recs))
  // toReturn |> console.log ('toReturn', __filename, #)
  // return true
}

export default H.wrapInResponse (addIsPartOf)