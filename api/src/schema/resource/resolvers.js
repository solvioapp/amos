/* This file just exports everything from ./Query, ./Mutation and ./Topic */

import {H} from 'common'
const req = H._req ({other: false}) (__dirname) (`.`)

// const Query = req (/\.\/Query\/(\.|\w)+\.js$/)
const Mutation = req (/\.\/Mutation\/(\.|\w)+\.js$/)
const Resource = req (/\.\/Resource\/(\.|\w)+\.js$/)

// export default {Query, Mutation, Resource}
export default {Mutation, Resource}
