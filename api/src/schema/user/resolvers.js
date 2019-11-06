/* This file just exports everything from ./Query and ./Mutation */

import {H} from 'common'
const req = H._req ({otherExports: false}) (__dirname) (`.`)

const Query = req (/\.\/Query\/(\.|\w)+\.js$/)
const Mutation = req (/\.\/Mutation\/(\.|\w)+\.js$/)

export default {Query, Mutation}
