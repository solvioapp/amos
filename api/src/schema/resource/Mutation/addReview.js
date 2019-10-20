import {H, R, normalizeUrl} from 'common'
const _1 = H.read (__dirname) (`./addReview.cypher`)
const metascraper = require('metascraper')([
  require('metascraper-title')()
])

import got from 'got'

const addReview = async (_, {input}, {session, ip, user}) => {

  const
  {topics, prerequisites} = input,

  links = R.map (x => normalizeUrl (x, {stripWWW: false})) (input.links)
  // Assuming no other resource exists with at least one such link

  /* If ip then review is anonymous */
  
  // TODO: generalize
  // TODO: don't choose first link
  const {body: html, url} = await got (links[0])
  const {title} = await metascraper ({html, url})

  // TODO: also prerequisites
  // TODO: topics
  await session.run (_1, {links, topics, prerequisites, title, id: user?.id, ip})
}

export default H.wrapInResponse (addReview)