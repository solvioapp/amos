import {R,A,H,rp} from 'common'

const _1 = `
  match (fb:GhAccount {userFbId: $userFbId})
  return fb
`

const authGithub = async (_, {input: {code}}, {session}) => {
  const

  qs = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  },

  options = {
    uri: `https://github.com/login/oauth/access_token`,
    method: `POST`,
    qs,
    json: true
  },

  data = await rp (options),
  [] = [data |> console.log ('data', #)],
  ghAccessToken = data?.access_token,

  options2 = {
    uri: `https://api.github.com/user`,
    headers: {
      'Authorization': `token ${ghAccessToken}`,
      'User-Agent': `Request-Promise`
    }
  }
  
  const res = await rp (options2)

  res |> console.log ('res', #)

  const options3 = R.mergeRight (options2) ({
    'uri': `https://api.github.com/user/emails`,
  })

  const emails = await rp (options3)

  emails |> console.log ('emails', #)
  
    // {records: [fbAccount]} = await session.run (_1, {userFbId}),
    
  // TODO: Check if user has LocalAccount

  message = H.isNotNilOrEmpty (fbAccount)
    ? do {
      const userId = fbAccount.get (`fb`).identity.low
      await A.createToken (process.env.JWT_SECRET, {sub: userId})
    }
    : fbAccessToken

  return {message}
}

export default H.wrapInResponse (authGithub)