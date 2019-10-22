const saveFbAccessToken = async ({success, message}, _, {cache}) => {
  console.log (`saveFbAccessToken`)
  success |> console.log ('success', #)
  message |> console.log ('message', #)
  if (success) {
    cache.writeData ({data: {fbAccessToken: message}})
  }
  else {
    return {success, message}
  }
}

export default saveFbAccessToken