// args: {ip, title, type, links, topics, prerequisites: {topic, level, strength}[]}
// Create resource
CREATE (r:Resource {name: $title, urls: $links})
// Create AmosGames
CREATE (aTopic:AmosGame {type: "TOPIC"})
// CREATE (aPrerequisite:AmosGame {
//   type: "PREREQUISITE",
//   level: $prerequisites[0].level,
//   strength: $prerequisites[0].strength
// })
// Attach AmosGame's to Resource
CREATE (aTopic)-[:FOR_RESOURCE]->(r)
// CREATE (aPrerequisite)-[:FOR_RESOURCE]->(r)
// Match
WITH r, aTopic
MATCH (tTopic:Topic {name: $topics[0]})
// MATCH (tPrerequisite:Topic {name: $prerequisites[0].topic})
// Attach AmosGame's to Topics
CREATE (aTopic)-[rel:FOR_TOPIC]->(tTopic)
// CREATE (aPrerequisite)-[:FOR_TOPIC]->(tPrerequisite)
// Merge AnonymousUser
// TODO: Only for Anonymous users
MERGE (u:AnonymousUser {ip: $ip})
// Attach AnonymousUser to AmosGame's
CREATE (u)-[:VOTED_ON_ANONYMOUS]->(aTopic)
// CREATE (u)-[:VOTED_ON_ANONYMOUS]->(aPrerequisite)