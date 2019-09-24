import {fs,path} from '../../common'
const _1 = fs.readFileSync (path.resolve (__dirname, `neo4j-query.cypher`), {encoding: `utf8`})
const metascraper = require('metascraper')([
  // require('metascraper-author')(),
  // require('metascraper-date')(),
  // require('metascraper-description')(),
  // require('metascraper-image')(),
  // require('metascraper-logo')(),
  // require('metascraper-clearbit')(),
  // require('metascraper-publisher')(),
  require('metascraper-title')(),
  // require('metascraper-url')()
])

const got = require('got')

const resolvers = {
  Query: {

  },
  Mutation: {
    // addReview: async (_, {type, links, topics, prerequisites}, {driver}) => {
    addReview: async (_, {input: {type, links, topics, prerequisites}}, {driver, ip}) => {
      // Assuming no other resource exists with at least one such link
      // Assuming reviews are anonymous
      topics |> console.log('topics', #)
      prerequisites |> console.log('prerequisites', #)
      // TODO: generalize
      const ses = driver.session()
      // TODO: don't choose first link
      const { body: html, url } = await got(links[0])
      const {title} = await metascraper({ html, url })

      // TODO: also prerequisites
      await ses.run (_1, {ip, title, type, links, topics, prerequisites})

      return true
    }
  }
}

export default resolvers