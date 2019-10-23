import {A,H,rp} from 'common'

const _1 = `
  match (fb:FbAccount {userFbId: $userFbId})
  return fb
`

const authFacebook = async (_, {input: {fbAccessToken}}, {session}) => {
  const

  {data: {user_id: userFbId}} = await rp (
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.APP_ID}|${process.env.APP_SECRET}`
    ) |> JSON.parse,
    
    {records: [fbAccount]} = await session.run (_1, {userFbId}),
    
  // TODO: Check if user has LocalAccount

  message = H.isNotNilOrEmpty (fbAccount)
    ? do {
      const userId = fbAccount.get (`fb`).identity.low,
      token = await A.createToken (process.env.JWT_SECRET, {sub: userId})
      /* Fsr this fails unless it's named first */
      const res = [`token`, token]
      res
    }
    : [`fbAccessToken`, fbAccessToken]

  return {message}
}

export default H.wrapInResponse (authFacebook)