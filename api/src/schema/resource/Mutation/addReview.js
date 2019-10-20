import {H, R, normalizeUrl, CONST} from 'common'
const metascraper = require (`metascraper`)([
  require (`metascraper-title`)()
])

import got from 'got'

export const 

match = `
  match (r:Resource {link: $link}) return r
`,

createResource = `
  create (r: Resource {link: $link, title: $title})
  with r
  return r 
`,

amosGameTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $topics as topic
  match (t: Topic) where id (t) = toInteger (topic)
  with r, t
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {type: "TOPIC"})-[:FOR_TOPIC]->(t)
  return g
`,
/* Doesn't work :( */
  // on match return 1
  // on create return 0
    
amosGamePrerequisites = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $prerequisites as p
  match (t: Topic) where id (t) = toInteger (p.topic)
  with r, t, p
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {
    type: "PREREQUSIITE",
    level: toInteger (p.level),
    strength: toInteger (p.strength)
  })-[:FOR_TOPIC]->(t)
  return g
`,

authorized = `
  match (u: User) where id (u) = toInteger ($userId)
  unwind $topicGames as topicGameId
  match (topicGame: AmosGame) where id (topicGame) = topicGameId
  merge (u)-[:VOTED_ON]->(topicGame)
  with u
  unwind $prerequisiteGames as prerequisiteGameId
  match (prerequisiteGame: AmosGame) where id (prerequisiteGame) = prerequisiteGameId
  merge (u)-[:VOTED_ON]->(prerequisiteGame)
`,

guest = `
  merge (u:AnonymousUser {ip: $ip})
  with u
  unwind $topicGames as topicGameId
  // Attach AnonymousUser to AmosGame's
  match (topicGame: AmosGame) where id (topicGame) = topicGameId
  merge (u)-[:VOTED_ON_ANONYMOUS]->(topicGame)
  with u
  unwind $prerequisiteGames as prerequisiteGameId
  match (prerequisiteGame: AmosGame) where id (prerequisiteGame) = prerequisiteGameId
  merge (u)-[:VOTED_ON_ANONYMOUS]->(prerequisiteGame)
`

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

  createResource = async () => {
    /* Get title from html page */
    const {title} = await metascraper ({html, url}),
    /* Create resource */
    {records: [resource]} = await session.run (createResource, {link, title})
    return resource.get (`r`).identity.low
  },

  resourceId = R.isEmpty (resources)
    ? await createResource()
    : resources[0].get (`r`).identity.low,
  
  /* Condtionally create Topic AmosGame */
  topicGames = H.isNotNilOrEmpty (topics)
    ? do {
      const {records} = await session.run (amosGameTopics, {resourceId, topics})
      R.map (r => r.get (`g`).identity.low) (records)
    }
    : [],

  /* Condtionally create Prerequisite AmosGame */
  prerequisiteGames = H.isNotNilOrEmpty (prerequisites)
    ? do {
      const {records} = await session.run (amosGamePrerequisites, {resourceId, prerequisites})
      R.map (r => r.get (`g`).identity.low) (records)
    }
    : [],
  games = {topicGames, prerequisiteGames}

  userId
    ? await session.run (authorized, {userId, ...games})
    : await session.run (guest, {ip, ...games})
}

export default H.wrapInResponse (addReview)