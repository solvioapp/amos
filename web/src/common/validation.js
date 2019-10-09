import {R, yup} from 'common'

const

RESERVED_PATHS = [`home`, `profile`, `review`, `reviews`],

noAt = R.complement (R.includes (`@`)),

username = yup
  .string()
  .min(3)
  .max(16)
  .notOneOf(RESERVED_PATHS)
  .test(noAt)
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

export const

signup = yup.object().shape ({username, email, password}),

login = yup.object().shape ({usernameOrEmail, password})
