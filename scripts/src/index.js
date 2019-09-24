import cleanDb from './clean-db'
import seedTopics from './seed-topics'
import seedReviews from './seed-reviews'

const run = async () => {
  await cleanDb()
  await seedTopics()
  await seedReviews()
}

run()