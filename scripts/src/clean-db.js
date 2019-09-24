import {v1 as neo4j} from 'neo4j-driver'
import * as R from 'ramda'

const [uri, username, password] = R.props 
  ([`NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`])
  (process.env)

const detachDelete = `match (a) detach delete a`
const driver = neo4j.driver (uri, neo4j.auth.basic (username, password))
const ses = driver.session()

const run = async () => {
  console.log (`Running ${detachDelete}`)
  try {
    await ses.run (detachDelete)
    /* Can't log anything because query from amos-parser doesn't return anything */
    driver.close()
  } catch (e) {
    console.log(`ERROR: ${e}`)
  }
}

run()
