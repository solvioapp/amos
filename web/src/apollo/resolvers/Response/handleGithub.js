import login from './login'

const handleGithub = async ({success, message: [type, message]}, _, {cache}) => (
  success && do {
    type === `token`
      ? do {
        await login ({success, message}, _, {cache})
      }
      : message
      // : do {
      //   cache.writeData ({data: {ghAccessToken: message[1]}})
      // }
  }
)

export default handleGithub