/* This file just exports everything from ./Query, ./Mutation and ./Topic */

import {H} from 'common'

const req = H.reqResolvers (__dirname),

Query = req (`Query`),
Mutation = req (`Mutation`),
Topic = req (`Topic`)

export default {Query, Mutation, Topic}

