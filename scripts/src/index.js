import "core-js/stable"
import 'regenerator-runtime/runtime'
import cleanDb from './clean-db'
import seedTopics from './seed-topics'
import seedReviews from './seed-reviews'

/* from https://stackoverflow.com/a/38446960/4204961 */

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}

/* from https://stackoverflow.com/a/51466112/4204961 */
global.fetch = require("node-fetch")

const run = async () => {
  console.log (`clean-db`)
  await cleanDb()
  console.log (`seed-topics`)
  await seedTopics()
  console.log (`seed-reviews`)
  await seedReviews()
}

run()