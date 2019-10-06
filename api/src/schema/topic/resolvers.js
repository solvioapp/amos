/* This file just exports everything from ./Query, ./Mutation and ./Topic */

import {H} from 'common'

const queries = H.req (__dirname) (`.`) (/\.\/Query\/(\.|\w)+\.js$/) (true)
const mutations = H.req (__dirname) (`.`) (/\.\/Mutation\/(\.|\w)+\.js$/) (true)
const topics = H.req (__dirname) (`.`) (/\.\/Topic\/(\.|\w)+\.js$/) (true)

export default {
  Query: H.arrayOfFnsToObject (queries),
  Mutation: H.arrayOfFnsToObject (mutations),
  Topic: H.arrayOfFnsToObject (topics),
}
