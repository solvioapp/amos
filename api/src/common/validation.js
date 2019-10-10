/* Note: Until this logic is lifted, all changes here
 * should be mirrored in /api/common/validation! */
import {R, yup} from 'common'

const

RESERVED_PATHS = [
  `profile`, `review`, `reviews`, `signup`, `login`, `topic`, `topics`, `topic-graph`,
  `resource`, `resources`, `admin`, `bot`, `amos`, `solvio`, `solviofoundation`,
  `home`, `callback`, `success`, `thanks`, `settings`, `help`, `news`, `newsfeed`,
  `feed`, `search`, `discover`, `explore`, `proposals`, `proposal`, `dashboard`,
  `terms`, `privacy`, `sponsors`, `about`, `school`, `schools`, `courses`, `logout`
],

noAt = R.complement (R.includes (`@`)),

username = yup
  .string()
  .min(3)
  .max(16)
  .notOneOf(RESERVED_PATHS)
  .test(``, `This is not a valid email and username can't have '@'.`, noAt)
  .label(`Username`)
  .required(),

email = yup
  .string()
  .email()
  .label(`Email`)
  .required(),

password = yup
  .string()
  .min(6)
  .label(`Password`)
  .required(),

/* Need to use non-arrow function per
  https://github.com/jquense/yup#mixedtestname-string-message-string--function-test-function-schema */
validateUsernameOrEmail = async function (str) {
  if (await email.isValid (str)) {
    return true
  }
  try {
    await username.label(`Username or email`).validate (str)
    return true
  }
  catch ({message}) {
    return await this.createError ({message})
  }
},

usernameOrEmail = yup
  .string()
  /* We don't need name and message (first two args)
    because we'll be creating an error in `validateUsernameOrEmail` */
  .test (``, ``, validateUsernameOrEmail)

export

{username, email}
  
export const

signup = yup.object().shape ({username, email, password}),

login = yup.object().shape ({usernameOrEmail, password})
