import {A,H,R,bcrypt,CONST,validation} from 'common'

const _1a = `
  MATCH (u:User) WHERE u.username = $username RETURN u
`

const _1b = `
  MATCH (la:LocalAccount {email: $email})
  RETURN la
`
const _2 = `
  CREATE (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (l:LocalAccount {hashedPassword: $hashedPassword, email: $email})
  RETURN u
`

const signup = async (_, {input}, {session}) => {
  const

  /* Validation */
  [] = [await validation.signup.validate (input, {abortEarly: false})],
  {username, email, password} = input,

  /* Check if email is free */
  {records: emails} = await session.run (_1b, {email}),
  [] = [H.assert (R.isEmpty (emails)) (CONST.email_taken (email))],

  /* Check if username is free */
  {records: usernames} = await session.run (_1a, {username}),
  [] = [H.assert (R.isEmpty (usernames)) (CONST.username_taken (username))],

  /* Hash password */
  hashedPassword = await bcrypt.hash (password, 12),

  /* Save user to db! */
  {records: [user]} = await session.run (_2, {username, email, hashedPassword}),
  id = user.get (`u`).identity.low,

  /* Grant jwt */
  /* `amos` is ADMIN (can add new topics) */
  message = username === `amos`
    ? await A.createToken (process.env.JWT_SECRET, {roles: [`ADMIN`], sub: id}) 
    : await A.createToken (process.env.JWT_SECRET, {sub: id})

  return {message}
}

export default H.wrapInResponse (signup)