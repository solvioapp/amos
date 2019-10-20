import {
  A, H, R, CONST, bcrypt, validation
} from 'common'

const _1 = `
  match (u:User)
  -[:AUTHENTICATED_WITH]->
  (l:LocalAccount {email: $email}) 
  return l.hashedPassword as hashedPassword
`

const _2 = `
  match (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (l:LocalAccount)
  return u, l.hashedPassword as hashedPassword
`

const login = async (_, {input: {usernameOrEmail, password}}, {session}) => {
  const 
  
  /* Is valid email? */
  isEmail = await validation.email.isValid (usernameOrEmail),
  
  /* Get cypher args */
  args = isEmail 
    && [_1, {email: {usernameOrEmail}}]
    || await (async () => {
      await validation.username.validate (usernameOrEmail, {abortEarly: false})
      return [_2, {username: usernameOrEmail}]
    })(),

  /* Don't validate password */

  /* Get user */
  {records: users} = await session.run (...args),

  /* Check if user exists */
  [] = [H.assert (H.isNotEmpty (users)) (CONST.cant_find_user (isEmail) (usernameOrEmail))],

  /* Check if password is correct */
  correctPassword = await bcrypt.compare (password, users[0].get (`hashedPassword`)),
  [] = [H.assert (correctPassword) (CONST.incorrect_password)],

  id = users[0].get (`u`).identity.low,

  /* Grant jwt */
  /* `amos` is ADMIN (can add new topics) */
  message = R.includes ([`amos`, `amos@solvio.org`]) (usernameOrEmail)
    ? await A.createToken (process.env.JWT_SECRET, {roles: [`ADMIN`], sub: id}) 
    : await A.createToken (process.env.JWT_SECRET, {sub: id})

  return {message}
}

export default H.wrapInResponse (login)