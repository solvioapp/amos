import {A,H,R,bcrypt} from '../../../common'

const signup = async (_, {username, email, password}, {driver}) => {
  /* Setup */
  const ses = driver.session()
  const _1a = 
  `MATCH (u:User) WHERE u.username = $username RETURN u`
  const _1b = 
  `MATCH (u:User) WHERE u.email = $email RETURN u`

  /* Check if username is free */
  const {records: recs1} = await ses.run (_1a, {username})      
  H.assert (R.isEmpty (recs1)) (`a user with username ${username} already exists`)

  /* Check if email is free */
  const {records: recs2} = await ses.run (_1b, {email})      
  H.assert (R.isEmpty (recs2)) (`a user with email ${email} already exists`)

  /* Hash password */
  const hashedPassword = await bcrypt.hash (password, 12)
  const _2 = 
  `CREATE (u:User {username: $username})
  -[:AUTHENTICATED_WITH]->
  (l:LOCAL_ACCOUNT {hashedPassword: $hashedPassword, email: $email})
  RETURN u`

  /* Save user to db! */
  await ses.run (_2, {username, email, hashedPassword})

  /* Grant jwt */
  /* `dteiml` is admin (can add new topics) */
  return username === `dteiml`
    ? await A.createToken (process.env.JWT_SECRET, {roles: [`admin`]}) 
    : await A.createToken (process.env.JWT_SECRET, {})
}

export default signup