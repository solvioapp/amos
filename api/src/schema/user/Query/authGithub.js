import {R,A,H,rp} from 'common'

const _1 = `
  match (gh:GhAccount {userGhId: $userGhId})
  return gh
`

const authGithub = async (_, {input: {ghCode}}, {session}) => {
  const

  qs = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: ghCode
  },

  getGhAccessToken = {
    uri: `https://github.com/login/oauth/access_token`,
    method: `POST`,
    qs,
    json: true
  },

  data = await rp (getGhAccessToken),
  ghAccessToken = data?.access_token,

  getUser = {
    uri: `https://api.github.com/user`,
    headers: {
      'Authorization': `token ${ghAccessToken}`,
      'User-Agent': `Request-Promise`
    },
    json: true
  },
  
  user = await rp (getUser),
  userGhId = user?.id,

  // TODO: Check if user has LocalAccount
  {records: [ghAccount]} = await session.run (_1, {userGhId}),
  message = H.isNotNilOrEmpty (ghAccount)
    ? do {
      const userId = ghAccount.get (`gh`).identity.low,
      token = await A.createToken (process.env.JWT_SECRET, {sub: userId})
      /* Fsr this fails unless it's named first */
      const res = [`token`, token]
      res
    }
    : [`ghAccessToken`, ghAccessToken]

  return {message}
}

export default H.wrapInResponse (authGithub)