import {H, R, normalizeUrl, CONST} from 'common'
const metascraper = require (`metascraper`)([
  require (`metascraper-title`)()
])

const match = `
  match (r:Resource {link: $link}) return r
`

const createResource = `
  create (r: Resource {link: $link, title: $title})
  with r
  return r 
`

const amosGameTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $topics as topic
  match (t: Topic) where id (t) = toInteger (topic)
  with r, t
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {type: "TOPIC"})-[:FOR_TOPIC]->(t)
  with g
  match (u: User) where id (u) = toInteger ($userId)
  with u, g
  merge (u)-[voted:VOTED_ON]->(g)
`
/* Doesn't work :( */
  // on match return 1
  // on create return 0
    
const amosGamePrerequisites = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $prerequisites as p
  match (t: Topic) where id (t) = toInteger (p.topic)
  with r, t, p
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {
    type: "PREREQUSIITE",
    level: toInteger (p.level),
    strength: toInteger (p.strength)
  })-[:FOR_TOPIC]->(t)
  with g
  match (u: User) where id (u) = toInteger ($userId)
  with u, g
  merge (u)-[voted:VOTED_ON]->(g)
`

import got from 'got'

const addReview = async (_, {input}, {session, ip, user}) => {
  // TODO: Add validation

  const
  {topics, prerequisites} = input,
  /* Check either topics or prerequisites are provided */
  [] = [
    H.assert
    (H.isNotNilOrEmpty (topics) || H.isNotNilOrEmpty (prerequisites))
    (CONST.no_topic_or_prerequisite)
  ],
  userId = user?.id,

  /* Normalize url */
  links = R.map (x => normalizeUrl (x, {stripWWW: false})) (input.links),
  // TODO: Generalize
  _link = links[0],
  /* Get html page with HTTP request */
  {body: html, url} = await got (_link),
  /* Again normalize new url */
  link = normalizeUrl (url, {stripWWW: false}),

  /* See if resource exists */
  {records: resources} = await session.run (match, {link}),
  isNew = R.isEmpty (resources),

  newResource = async () => {
    /* Get title from html page */
    const {title} = await metascraper ({html, url}),
    /* Create resource */
    {records: [resource]} = await session.run (createResource, {link, title})
    return resource.get (`r`).identity.low
  },

  resourceId = isNew ? await newResource() : resources[0].get (`r`).identity.low
  
  /* Condtionally create Topic AmosGame */
  H.isNotNilOrEmpty (topics) 
    && await session.run (amosGameTopics, {resourceId, topics, userId})

  /* Condtionally create Prerequisite AmosGame */
  H.isNotNilOrEmpty (prerequisites)
    && await session.run (amosGamePrerequisites, {resourceId, prerequisites, userId})
}

export default H.wrapInResponse (addReview)