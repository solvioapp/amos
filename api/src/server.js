import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {getDriver} from './bootstrap/neo4j'
import schema from './schema'
import {H, R} from 'common'

const driver = getDriver()

const context = async ({req}) => {
  const session = driver.session()
  const {headers} = req
  const user = await H.decode (driver, headers.authorization)
  const ip = headers[`x-forwarded-for`] || req.connection.remoteAddress

  return {
    driver,
    session,
    headers,
    user,
    ...(headers.authorization ? null : {ip}),
    cypherParams: {
      currentUserId: user?.id,
    },
  }
}

const defaults = {
  context,
  schema,
  playground: true,
  introspection: true,
  // TODO: Change
  allowUndefinedInResolve: true,
}

const server = options => do {
  const server = new ApolloServer (R.mergeAll ([defaults, options])),
  app = express()
  server.applyMiddleware ({ app, path: `/` })
  app
}

export default server
