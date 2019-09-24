import fs from 'fs'
import parser from '@solviofoundation/amos-parser'
import {v1 as neo4j} from 'neo4j-driver'
import * as R from 'ramda'

require.extensions[`.amos`] = (module, filename) => {
  module.exports = fs.readFileSync (filename, `utf8`)
}

// TODO: migrate to apollo-client

const topics = require (`@solviofoundation/amos-topics`)

const [uri, username, password] = R.props 
  ([`NEO4J_URI`, `NEO4J_USERNAME`, `NEO4J_PASSWORD`])
  (process.env)

const parsed = parser (topics)
const driver = neo4j.driver (uri, neo4j.auth.basic (username, password))
const ses = driver.session()

const run = async () => {
  console.log (`Running ${parsed}`)
  try {
    await ses.run (parsed)
    /* Can't log anything because query from amos-parser doesn't return anything */
    driver.close()
  } catch (e) {
    console.log(`ERROR: ${e}`)
  }
}

run()
