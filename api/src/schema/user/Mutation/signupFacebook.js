import {A,H,rp} from 'common'

const _1 = `
  create (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (fb:FbAccount {userFbId: $userFbId, email: $email})
  return u
`


const signupFacebook = async (_, {input}, {session}) => {
  const

  // TODO: Username validation

  {accessToken, username} = input,

  // TODO: query params
  // TODO: Error handling
  {data: {user_id: userFbId}} = await rp (
    `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${process.env.APP_ID}|${process.env.APP_SECRET}`
  ) |> JSON.parse,

  {email} = await rp (
    `https://graph.facebook.com/me/?access_token=${accessToken}&fields=email`
  ),

  {records: [user]} = await session.run (_1, {userFbId, username, email}),
  userId = user.get (`u`).identity.low,

  message = await A.createToken (process.env.JWT_SECRET, {sub: userId})

  return {message}
}

export default H.wrapInResponse (signupFacebook)