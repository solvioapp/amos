import {H, R, normalizeUrl, CONST} from 'common'
// const _2 = H.read (__dirname) (`./newResource.cypher`)
// const _3 = H.read (__dirname) (`./oldResource.cypher`)
const metascraper = require (`metascraper`)([
  require (`metascraper-title`)()
])

const _1 = `
  match (r:Resource {link: $link}) return r
`

const _2 = `
  create (r: Resource {link: $link, title: $title})
  with r
  return r 
`

const _3 = `
  match (r: Resource) where id (r) = $id
  with r
  create (g:AmosGame {type: "TOPIC"})
  create (g)-[:FOR_RESOURCE]->(r)
  with g, r
  unwind $topics as topic
  with g, r, topic
  match (t: Topic) where topic in t.names
  create (g)-[rel:FOR_TOPIC]->(t)
  with g, r, t,
  match (u: User) where id (u) = $id
  with g, r, t, u
  merge (u)-[voted:VOTED_ON]->g
`

import got from 'got'

const addReview = async (_, {input}, {session, ip, user}) => {

  const
  {topics, prerequisites} = input,
  [] = [
    H.assert
    (H.isNotNilOrEmpty (topics) || H.isNotNilOrEmpty (prerequisites))
    (CONST.no_topic_or_prerequisite)
  ],
  id = user?.id,

  links = R.map (x => normalizeUrl (x, {stripWWW: false})) (input.links),
  // TODO: Generalize
  link = links[0],

  {records: resources} = await session.run (_1, {link}),
  isNew = R.isEmpty (resources),

  newResource = async () => {
    console.log (`new Resource`)
    const {body: html, url} = await got (link),
    {title} = await metascraper ({html, url}),
    {records: [resource]} = await session.run (_2, {link, title}),
    id = resource.get (`r`).identity.low
    H.isNotNilOrEmpty (topics) && await session.run (_3, {topics, id})
    // H.isNotNilOrEmpty (prerequisites) && await session.run (_4, {prerequisites, id})
  },
  oldResource = async () => {},

  [] = [isNew ? await newResource() : await oldResource()]

  /* If ip then review is anonymous */
  
  // TODO: generalize
  // TODO: don't choose first link

  // TODO: also prerequisites
  // TODO: topics
}

export default H.wrapInResponse (addReview)