/* This file just exports everything from ./Query and ./Mutation */

import {H} from 'common'

const Query = H.req (__dirname) (`.`) (/\.\/Query\/(\.|\w)+\.js$/)
const Mutation = H.req (__dirname) (`.`) (/\.\/Mutation\/(\.|\w)+\.js$/)

export default {Query, Mutation}
