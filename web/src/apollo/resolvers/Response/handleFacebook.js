import login from './login'

const handleFacebook = async ({success, message}, _, {cache}) => {
  console.log (`handleFacebook`)
  success |> console.log ('success', #)
  message |> console.log ('message', #)
  return success && do {
    message[0] === `token`
      ? do {
        await login ({success, message: message[1]}, _, {cache})
      }
      : do {
        cache.writeData ({data: {fbAccessToken: message[1]}})
      }
  }
}

export default handleFacebook