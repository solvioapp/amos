import {R,A,H,validation,CONST,rp} from 'common'

const _1a = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`

const _1b = `
  create (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (gh:GhAccount {userGhId: $userGhId})
  return u
`

const attachEmail = `
  match (gh: GhAccount {userGhId: $userGhId})
  with gh
  set gh.email = $email
`


const signupGithub = async (_, {input}, {session}) => {
  const

  {ghAccessToken, username} = input,

  /* Validation */
  [] = [await validation.username.validate (username, {abortEarly: false})],

  /* Check if username is free */
  {records: usernames} = await session.run (_1a, {username}),
  [] = [H.assert (R.isEmpty (usernames)) (CONST.username_taken (username))],

  getUser = {
    uri: `https://api.github.com/user`,
    headers: {
      'Authorization': `token ${ghAccessToken}`,
      'User-Agent': `Request-Promise`
    },
    json: true
  },

  [] = [getUser |> console.log ('getUser', #)],
  
  userGh = await rp (getUser),
  userGhId = userGh?.id,
  
  // TODO: query params
  // TODO: Error handling

  {records: [user]} = await session.run (_1b, {userGhId, username}),

  userId = user.get (`u`).identity.low,
  getEmails = R.mergeRight (getUser) ({
    'uri': `https://api.github.com/user/emails`,
  }),

  [] = [getEmails |> console.log ('getEmails', #)],
  [_email] = (await rp (getEmails))
    |> R.filter (R.propEq (`primary`) (true)) (#),

  email = _email?.email,
  [] = [H.isNotNilOrEmpty (email) && await session.run (attachEmail, {userGhId, email})],

  message = await A.createToken (process.env.JWT_SECRET, {sub: userId})

  return {message}
}

export default H.wrapInResponse (signupGithub)