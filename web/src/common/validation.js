import {yup} from 'common'

export const

signup = yup.object().shape({
  username: yup.string().invalid([`bar`]).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
}),

login = yup.object().shape ({
  usernameOrEmail: yup.string().required(),
  password: yup.string().min(6).required(),
})