import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import CONFIG, {requiredConfigs} from './config'
import middleware from './middleware'
import {getDriver} from './bootstrap/neo4j'
// import decode from './jwt/decode'
import schema from './schema'
import {R,path} from 'common'
import helmet from 'helmet'

// check required configs and throw error
// TODO check this directly in config file - currently not possible due to testsetup
R.mapObjIndexed ((val, key) => val ? null : throw new Error(`ERROR: "${key}" env variable is missing.`))  (requiredConfigs)

const driver = getDriver()

const context = async ({req}) => {
  const session = driver.session()
  return {
    driver,
    session,
    // user,
    headers: req.headers,
    // TODO: Only for anonymous users
    ip: req.headers[`x-forwarded-for`] || req.connection.remoteAddress,
    cypherParams: {
      // currentUserId: user?.id,
    },
  }
}

const defaults = {
  context,
  schema,
  debug: !!CONFIG.DEBUG,
  tracing: !!CONFIG.DEBUG,
  playground: true,
  introspection: true,
}

const CLIENT_BUILD_PATH = path.join(__dirname, `../../web/public`);

const createServer = options => {
  const server = new ApolloServer (R.mergeAll ([defaults, options]))

  const app = express()
  // app.use (helmet())

  // app.use (express.static (CLIENT_BUILD_PATH))

  // // app.get(`*`, (req, res) => {
  // //   res.sendFile (path.join (CLIENT_BUILD_PATH, `index.html`))
  // // })

  // app.get('/api', (req, res) => {
  //   res.set('Content-Type', 'application/json');
  //   let data = {
  //     message: 'Hello world, Woooooeeeee!!!!'
  //   };
  //   res.send(JSON.stringify(data, null, 2));
  // });

  
  // app.listen(process.env.PORT || 4001, `0.0.0.0`, () => console.log(`Server ready`));
  
  server.applyMiddleware ({ app, path: `/` })
  
  // // All remaining requests return the React app, so it can handle routing.
  // app.get('*', function(request, response) {
  //   response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  // });
  return {app, server}
}

export default createServer
