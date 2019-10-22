import {R,A,H,validation,CONST,rp} from 'common'

const _1a = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`

const _1b = `
  create (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (fb:FbAccount {userFbId: $userFbId, email: $email})
  return u
`


const signupGithub = async (_, {input}, {session}) => {
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
    `https://graph.facebook.com/debug_token?input_token=${fbAccessToken}&access_token=${process.env.APP_ID}|${process.env.APP_SECRET}`
  ) |> JSON.parse,

  {email} = await rp (
    `https://graph.facebook.com/me/?access_token=${fbAccessToken}&fields=email`
  ) |> JSON.parse,

  {records: [user]} = await session.run (_1b, {userFbId, username, email}),
  userId = user.get (`u`).identity.low,

  message = await A.createToken (process.env.JWT_SECRET, {sub: userId})

  return {message}
}

export default H.wrapInResponse (signupGithub)