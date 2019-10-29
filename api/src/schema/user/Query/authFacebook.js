import {A,H,rp} from 'common'

const _1 = `
  match (fb:FbAccount {userFbId: $userFbId})
  return fb
`

const authFacebook = async (_, {input: {fbAccessToken}}, {session}) => {
  fbAccessToken |> console.log ('fbAccessToken', #)
  process.env.FACEBOOK_APP_ID |> console.log ('process.env.FACEBOOK_APP_ID', #)
  
  const

  {data: {user_id: userFbId}} = await rp (
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
    ) |> JSON.parse,
    
  {records: [fbAccount]} = await session.run (_1, {userFbId}),

  [] = [fbAccount |> console.log ('fbAccount', #)],
    
  // TODO: Check if user has LocalAccount

  message = H.isNotNilOrEmpty (fbAccount)
    ? do {
      const userId = fbAccount.get (`fb`).identity.low,
      token = await A.createToken (process.env.JWT_SECRET, {sub: userId})
      /* Fsr this fails unless it's named first */
      const res = [`token`, token]
      res |> console.log ('res', #)
      res
    }
    : do {
      const res = [`fbAccessToken`, fbAccessToken]
      res |> console.log ('res', #)
      res
    }

  message |> console.log ('message', #)

  return {message}
}

export default H.wrapInResponse (authFacebook)