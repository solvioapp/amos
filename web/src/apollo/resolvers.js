import {Cookies} from 'common'

const login = async ({success, message}, _, {cache}) => {
  if (success) {
    (new Cookies()).set (`auth`, auth)
    cache.writeData ({data: {isAuthenticated: true}})
  }
  else {
    return {success, message}
  }
}

const logout = (_, args, {client}) => {
  (new Cookies()).remove (`auth`)
  client.resetStore()
}

export default {
  Mutation: {logout},
  Response: {login},
}