import {R, H} from 'common'
const _1 = H.read (__dirname) (`./hydration.cypher`)

const addReviewHydration = async (_, params, {session, ip}) => {
  await session.run (_1, R.merge (params) ({ip}))

  // return true
}

export default H.wrapInResponse (addReviewHydration)