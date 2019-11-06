/* This file just exports everything from ./Query, ./Mutation and ./Topic */

import {H} from 'common'

const Query = H.req (__dirname) (`.`) (/\.\/Query\/(\.|\w)+\.js$/)
const Mutation = H.req (__dirname) (`.`) (/\.\/Mutation\/(\.|\w)+\.js$/)
const Resource = H.req (__dirname) (`.`) (/\.\/Resource\/(\.|\w)+\.js$/)

export default {Query, Mutation, Resource}
