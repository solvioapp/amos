/* Note: Until this logic is lifted, all changes here
 * should be mirrored in /api/common/validation! */
import {R, yup, CONST} from 'common'

const {string, number, object, array} = yup

export const

RESERVED_PATHS = [
  `profile`, `review`, `reviews`, `signup`, `login`, `topic`, `topics`, `topic-graph`,
  `resource`, `resources`, `admin`, `bot`, `amos`, `solvio`, `solviofoundation`,
  `home`, `callback`, `success`, `thanks`, `settings`, `help`, `news`, `newsfeed`,
  `feed`, `search`, `discover`, `explore`, `proposals`, `proposal`, `dashboard`,
  `terms`, `privacy`, `sponsors`, `about`, `school`, `schools`, `courses`, `logout`
],

noAt = R.complement (R.includes (`@`)),

username = string()
  .min(3)
  .max(16)
  .notOneOf(RESERVED_PATHS)
  .test(``, `This is not a valid email and username can't have '@'.`, noAt)
  .label(`Username`)
  .required(),

email = string()
  .email()
  .label(`Email`)
  .required(),

password = string()
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

usernameOrEmail = string()
  /* We don't need name and message (first two args)
    because we'll be creating an error in `validateUsernameOrEmail` */
  .test (``, ``, validateUsernameOrEmail),

/* Extend signup */
signup = object().shape ({
  username, email, password,
  repeatPassword: string().oneOf([yup.ref(`password`)], CONST.passwords_dont_match),
}),

login = object().shape ({usernameOrEmail, password}),

/* Add review */
// links = array().of (string().url().required()).required(),
links = object().shape ({links: string()}),
// links = string().required(),
topics = string(),
// topics = array().of (string().required()),
prerequisites = string(),
// prerequisites = array().of (object().shape ({
//   strength: number().oneOf ([1, 2, 3]).required(),
//   level: number().oneOf ([1, 2, 3, 4]).required(),
//   topic: string().required(),
// })),

addReview = object().shape ({links, topics, prerequisites})
