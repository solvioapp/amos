import {v1 as neo4j} from 'neo4j-driver'
import CONFIG from '../config'

// let driver

export const getDriver = (options = {}) => {
  const {
    uri = CONFIG.NEO4J_URI,
    username = CONFIG.NEO4J_USERNAME,
    password = CONFIG.NEO4J_PASSWORD,
  } = options
  // if (!driver) {
    console.log(`123dom`)
    var graphenedbURL = `bolt://hobby-gjdkpaphfkpjgbkehgobnodl.dbs.graphenedb.com:24787`
    var graphenedbUser = `app147165496-Ky5VrG`
    var graphenedbPass = `b.X4Snx9RcujTM.P7O4fi6u3RHz1XDZ`
    var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass))
    var session = driver.session();
    session
        .run("CREATE (n {hello: 'World'}) RETURN n.name")
        .then(function(result) {
            result.records.forEach(function(record) {
                console.log(record)
            });

            session.close();
        })
        .catch(function(error) {
            console.log(error);
        });
    
  // const driver = neo4j.driver(, neo4j.auth.basic(username, password))
  // }
  return driver
}