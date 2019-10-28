import {H, R, normalizeUrl, CONST} from 'common'
const metascraper = require (`metascraper`)([
  require (`metascraper-title`)()
])

import got from 'got'

const THRESHOLD_TOPIC = 0.1,

THRESHOLD_PREREQUISITE = 0.02

export const 

match = `
  match (r:Resource {link: $link}) return r
`,

createResource = `
  create (r: Resource)
  set r = $input
  return r
`,

amosGameTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $topics as topicId
  match (t: Topic) where id (t) = toInteger (topicId)
  with r, t
  merge (r)<-[:FOR_RESOURCE]-(g:AmosGame {type: "TOPIC"})-[:FOR_TOPIC]->(t)
  with g, t
  optional match (u:User)-[:VOTED_ON]->(g)
  optional match (a:AnonymousUser)-[:VOTED_ON_ANONYMOUS]->(g)
  with g, t, count (u) as noVotesAuthorized, count (a) as noVotesAnonymous
  return g, t, noVotesAuthorized + noVotesAnonymous as noVotes
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
  with g
  optional match (u:User)-[:VOTED_ON]->(g)
  optional match (a:AnonymousUser)-[:VOTED_ON_ANONYMOUS]->(g)
  with g, count (u) as noVotesAuthorized, count (a) as noVotesAnonymous
  return g, noVotesAuthorized + noVotesAnonymous as noVotes
`,

authorized = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  match (u: User) where id (u) = toInteger ($userId)
  unwind $topicGames as topicGameId
  match (topicGame: AmosGame) where id (topicGame) = topicGameId
  merge (u)-[:VOTED_ON]->(topicGame)
    on create
      set r.noVotesTopics = r.noVotesTopics + 1
  with u, r
  unwind $prerequisiteGames as prerequisiteGameId
  match (prerequisiteGame: AmosGame) where id (prerequisiteGame) = prerequisiteGameId
  merge (u)-[:VOTED_ON]->(prerequisiteGame)
    on create
      set r.noVotesPrerequisites = r.noVotesPrerequisites + 1
  return r
`,
      // topicGame.noVotes = topicGame.noVotes + 1

guest = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  merge (u:AnonymousUser {ip: $ip})
  with u, r
  unwind $topicGames as topicGameId
  // Attach AnonymousUser to AmosGame's
  match (topicGame: AmosGame) where id (topicGame) = topicGameId
  merge (u)-[:VOTED_ON_ANONYMOUS]->(topicGame)
    on create
      set r.noVotesTopics = r.noVotesTopics + 1
  with u, r
  unwind $prerequisiteGames as prerequisiteGameId
  match (prerequisiteGame: AmosGame) where id (prerequisiteGame) = prerequisiteGameId
  merge (u)-[:VOTED_ON_ANONYMOUS]->(prerequisiteGame)
    on create
      set r.noVotesPrerequisites = r.noVotesPrerequisites + 1
  return r
`,
      // prerequisiteGame.noVotes = prerequisiteGame.noVotes + 1

updateTopics = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $consensedTopicIds as topicId
  match (t: Topic) where id (t) = topicId
  merge (r)-[:HAS_TOPIC]->(t)
`,

updatePrerequisites = `
  match (r: Resource) where id (r) = toInteger ($resourceId)
  unwind $consensedPrerequisiteIds as prerequisiteId
  match (g: AmosGame) where id (g) = prerequisiteId
  merge (r)-[:HAS_PREREQUISITE]->(g)
`

const addReviewHydration = async (_, {input}, {session, user}) => {
  const
  userId = user?.id,

  /* Normalize two urls */
  _input = R.has (`url_main`) (input)
    ? R.over (R.lensProp (`url_main`)) (x => normalizeUrl (x, {stripWWW: false})) (input)
    : input,

  __input = R.has (`url_goodreads`) (_input)
    ? R.over (R.lensProp (`url_goodreads`)) (x => normalizeUrl (x, {stripWWW: false})) (_input)
    : _input,

  /* Create resource */
  {records: [_resource]} = await session.run (createResource, __input),

  resourceId = _resource.get (`r`).identity.low,
  
  /* Create Topic AmosGame */
  topicGames = do {
    const {records} = await session.run (amosGameTopics, {resourceId, topics: __input.topics})
    R.map (r => ({
      gameId: r.get (`g`).identity.low,
      topicId: r.get (`t`).identity.low,
      noVotes: r.get (`noVotes`)
    })) (records)
  },

  /* Create Prerequisite AmosGame */
  prerequisiteGames = do {
    const {records} = await session.run (amosGamePrerequisites, {resourceId, prerequisites})
    R.map (r => ({
      gameId: r.get (`g`).identity.low,
      noVotes: r.get (`noVotes`)
    })) (records)
  },

  games = {topicGames, prerequisiteGames},

  /* gamesIds is an obj of arrays */
  gamesIds = R.map (R.pluck (`gameId`)) (games),

  /* Attach AmosGame's to user */
  {records: [resource]} = await session.run (authorized, {userId, ...gamesIds, resourceId}),
  
  {noVotesTopics, noVotesPrerequisites} = resource.get (`r`).properties,
  /* 
   * cool word! 
   * (comes from `consensus` :-))
   */
  consensedTopicIds = R.reduce ((acc, {topicId, noVotes}) => (
    noVotesTopics / noVotes <= 1 / THRESHOLD_TOPIC
      ? R.append (topicId) (acc)
      : acc
  )) ([]) (topicGames),

  consensedPrerequisiteIds = R.reduce ((acc, {gameId, noVotes}) => (
    noVotesPrerequisites / noVotes <= 1 / THRESHOLD_PREREQUISITE
      ? R.append (gameId) (acc)
      : acc
  )) ([]) (prerequisiteGames)
  
  /* Set new topics/prerequisites */
  await session.run (updateTopics, {resourceId, consensedTopicIds})
  await session.run (updatePrerequisites, {resourceId, consensedPrerequisiteIds})
}

export default H.wrapInResponse (addReviewHydration)