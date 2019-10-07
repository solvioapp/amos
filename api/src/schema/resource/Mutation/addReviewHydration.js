import {R,H} from 'common'
const _1 = H.read (__dirname) (`./addReview.cypher`)

const addReviewHydration = async (_, params, {session, ip}) => {
  await session.run (_1, R.merge (params) ({ip}))

  return true
}

export default addReviewHydration