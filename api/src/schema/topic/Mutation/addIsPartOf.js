import {H} from 'common'

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
  await session.run (_1, input)
}

export default H.wrapInResponse (addIsPartOf)