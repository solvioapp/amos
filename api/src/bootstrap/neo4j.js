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
    var driver = neo4j.driver(uri, neo4j.auth.basic(username, password))
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