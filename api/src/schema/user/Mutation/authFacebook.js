import {A,H,rp} from 'common'
import signupFacebook from './signupFacebook'

const matchUserFbId = `
  match (u: User)
  -[:AUTHENTICATED_WITH]->
  (fb: FbAccount {userFbId: $userFbId})
  return u
`,

getUserByEmail = `
  match (u: User)
  -[:HAS_EMAIL]->
  (e: Email)
  return u, e.email as email
`,

authFacebook = async (_, {input: {fbAccessToken}}, {session}) => {
  const

  {data: {user_id: userFbId}} = await rp (
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
    ) |> JSON.parse,
    
  {records: [result]} = await session.run (matchUserFbId, {userFbId}),

  message = H.isNotNilOrEmpty (result)
    ? do {
      /* User has a FbAccount */
      const userId = result.get (`u`).identity.low,
      token = await A.createToken (process.env.JWT_SECRET, {sub: userId})
      /* Fsr this fails unless it's named first */
      const res = [`token`, token]
      res
    }
    : do {
      /* User doesn't have FbAccount */
      const {email} = await rp (
        `https://graph.facebook.com/me/?access_token=${fbAccessToken}&fields=email`
      ) |> JSON.parse,
      {records: [_result]} = await session.run (getUserByEmail, {email}),
      _email  = _result.get (`email`)
      _email
        ? do {
          /* User has another account */
          const username = _result.get (`u`).properties.username
          signupFacebook (_, {input: {fbAccessToken, username}}, {session})
        }
        : [`fbAccessToken`, fbAccessToken]
    }

  return {message}
}

export default H.wrapInResponse (authFacebook)