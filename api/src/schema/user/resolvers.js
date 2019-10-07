/* This file just exports everything from ./Query and ./Mutation */

import {H} from 'common'

const queries = H.req (__dirname) (`.`) (/\.\/Query\/(\.|\w)+\.js$/) (true)
const mutations = H.req (__dirname) (`.`) (/\.\/Mutation\/(\.|\w)+\.js$/) (true)

export default {
  Query: H.arrayOfFnsToObject (queries),
  Mutation: H.arrayOfFnsToObject (mutations),
}
