import {H, normalizeUrl} from 'common'
const _1 = H.read (__dirname) (`./addReview.cypher`)
const metascraper = require('metascraper')([
  require('metascraper-title')()
])

import got from 'got'

const addReview = async (_, {input: {type, links, topics, prerequisites, _id}}, {driver, ip}) => {
  // Assuming no other resource exists with at least one such link
  // Assuming reviews are anonymous

  ip |> console.log ('ip', #)

  topics |> console.log('topics', #)
  prerequisites |> console.log('prerequisites', #)
  
  // TODO: generalize
  const ses = driver.session()
  // TODO: don't choose first link
  const {body: html, url} = await got (links[0])
  const {title} = await metascraper ({html, url})

  // TODO: also prerequisites
  // TODO: topics
  await ses.run (_1, {ip, title, type, links, topics, prerequisites, _id})

  return true
}

export default addReview