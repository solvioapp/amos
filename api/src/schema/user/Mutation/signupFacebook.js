import {R,A,H,validation,CONST,rp} from 'common'

const _1a = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`

const _1b = `
  create (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (fb:FbAccount {userFbId: $userFbId})
  return u
`

const attachEmail = `
  match (fb: FbAccount {userFbId: $userFbId}
  with fb
  fb.email = $email
`


const signupFacebook = async (_, {input}, {session}) => {
  const

  {fbAccessToken, username} = input,

  /* Validation */
  [] = [await validation.username.validate (username, {abortEarly: false})],


  /* Check if username is free */
  {records: usernames} = await session.run (_1a, {username}),
  [] = [H.assert (R.isEmpty (usernames)) (CONST.username_taken (username))],
  
  // TODO: query params
  // TODO: Error handling
  {data: {user_id: userFbId}} = await rp (
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`
  ) |> JSON.parse,

  {records: [user]} = await session.run (_1b, {userFbId, username}),
  userId = user.get (`u`).identity.low,

  {email} = await rp (
    `https://graph.facebook.com/me/?access_token=${fbAccessToken}&fields=email`
  ) |> JSON.parse,

  [] = [H.isNotNilOrEmpty (email) && await session.run (attachEmail, {userFbId, email})],

  message = await A.createToken (process.env.JWT_SECRET, {sub: userId})

  return {message}
}

export default H.wrapInResponse (signupFacebook)