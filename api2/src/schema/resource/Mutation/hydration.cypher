// args: {ip, title, type, links, topics, prerequisites: {topic, level, strength}[]}
// Create resource
// CREATE (resource:Resource {name: $title, urls: $links})
create (resource:Resource)
set resource = $input
// Create AmosGames
CREATE (amosGameTopic:AmosGame {type: "TOPIC"})
// CREATE (aPrerequisite:AmosGame {
//   type: "PREREQUISITE",
//   level: $prerequisites[0].level,
//   strength: $prerequisites[0].strength
// })
// Attach AmosGame's to Resource
CREATE (amosGameTopic)-[:FOR_RESOURCE]->(resource)
// CREATE (aPrerequisite)-[:FOR_RESOURCE]->(resource)
// Match
WITH resource, amosGameTopic
MATCH (topic:Topic)
where $input.topics[0] in topic.names
// MATCH (tPrerequisite:Topic {name: $prerequisites[0].topic})
// Attach AmosGames to Topics
CREATE (amosGameTopic)-[rel:FOR_TOPIC]->(topic)
// CREATE (aPrerequisite)-[:FOR_TOPIC]->(tPrerequisite)
// Merge AnonymousUser
// TODO: Only for Anonymous users
MERGE (u:AnonymousUser {ip: $ip})
// Attach AnonymousUser to AmosGame's
CREATE (u)-[:VOTED_ON_ANONYMOUS]->(amosGameTopic)
// CREATE (u)-[:VOTED_ON_ANONYMOUS]->(aPrerequisite)