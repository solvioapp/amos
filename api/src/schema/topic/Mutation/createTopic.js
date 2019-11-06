import {H} from 'common'

const

_1 = `
  merge (t:Topic {names: $names})
  return t
`,

createTopic = async (_, {input}, {session}) => {
  await session.run (_1, input)
}

export default H.wrapInResponse (createTopic)