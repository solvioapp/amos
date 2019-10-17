import {
  A,H,CONST,bcrypt, validation
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
  return l.hashedPassword as hashedPassword
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

  /* Get user's hashed password */
  {records: recs} = await session.run (...args),

  /* Check if user exists */
  [] = [H.assert (H.isNotEmpty (recs)) (CONST.cant_find_user (isEmail) (usernameOrEmail))],

  /* Check if password is correct */
  correctPassword = await bcrypt.compare (password, recs[0].get (`hashedPassword`)),
  [] = [H.assert (correctPassword) (CONST.incorrect_password)],

  /* Grant jwt */
  message = await A.createToken (process.env.JWT_SECRET, {})
  return {message}
}

export default H.wrapInResponse (login)