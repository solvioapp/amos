import {A,H,R,CONST,bcrypt} from 'common'

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
  const email = R.includes (`@`) (usernameOrEmail) 
  const args = email
    ? [_1, {email: usernameOrEmail}]
    : [_2, {username: usernameOrEmail}]

  /* Get user's hashed password */
  const {records: recs} = await session.run (...args)

  /* Check if user exists */
  H.assert (H.isNotEmpty (recs)) (CONST.cant_find_user (email) (usernameOrEmail))

  /* Check if password is correct */
  const correctPassword = await bcrypt.compare (password, recs[0].get (`hashedPassword`))
  H.assert (correctPassword) (CONST.incorrect_password)

  /* Grant jwt */
  return await A.createToken (process.env.JWT_SECRET, {})
}

export default H.wrapInResponse (login)