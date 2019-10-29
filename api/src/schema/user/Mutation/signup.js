import {A,H,R,bcrypt,CONST,validation} from 'common'

const getUsername = `
  match (u: User)
  where u.username = $username
  return u
`,

getEmail = `
  match (e: Email {email: $email})
  return e
`,

saveUser = `
  create (e: Email {email: $email})
  <-[:HAS_EMAIL]-
  (u: User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (l: LocalAccount {hashedPassword: $hashedPassword})
  RETURN u
`,

signup = async (_, {input}, {session}) => {
  const

  /* Validation */
  [] = [await validation.signup.validate (input, {abortEarly: false})],
  {username, email, password} = input,

  /* Check if email is free */
  {records: [_email]} = await session.run (getEmail, {email}),
  [] = [H.assert (R.isNil (_email)) (CONST.email_taken (email))],

  /* Check if username is free */
  {records: [_username]} = await session.run (getUsername, {username}),
  [] = [H.assert (R.isNil (_username)) (CONST.username_taken (username))],

  /* Hash password */
  hashedPassword = await bcrypt.hash (password, 12),

  /* Save user to db! */
  {records: [user]} = await session.run (saveUser, {username, email, hashedPassword}),
  id = user.get (`u`).identity.low,

  /* Grant jwt */
  /* `amos` is ADMIN (can add new topics) */
  message = username === `amos`
    ? await A.createToken (process.env.JWT_SECRET, {roles: [`ADMIN`], sub: id}) 
    : await A.createToken (process.env.JWT_SECRET, {sub: id})

  return {message}
}

export default H.wrapInResponse (signup)