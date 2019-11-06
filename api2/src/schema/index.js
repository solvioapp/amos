import {R} from 'common'
import {makeExecutableSchema} from 'apollo-server'
import applyDirectives from '../bootstrap/directives'
import applyScalars from '../bootstrap/scalars'
import typeDefs from './types'
import resolvers from './resolvers'
import CONFIG from '../config'
import {
  IsAuthenticatedDirective,
  HasRoleDirective,
  HasScopeDirective
} from "graphql-auth-directives"

export default {
  typeDefs,
  resolvers,
  // TODO: Change
  allowUndefinedInResolve: true,
  schemaDirectives: {
    isAuthenticated: IsAuthenticatedDirective,
    hasRole: HasRoleDirective,
    hasScope: HasScopeDirective,
  },
  config: {
    debug: !!CONFIG.DEBUG,
    auth: {
      isAuthenticated: true,
      hasRole: true,
    },
    // query: true,
    // query: false,
    // query: {
    //   exclude: [
    //     // `AmosGame`,
    //     `Response`,
    //     `Path`,
    //     // `autocomplete`,
    //   ],
    // },
    // mutation: false,
    // mutation: true,
    // mutation: {
    //   exclude: [
    //     `Topic`,
    //     // `AmosGame`,
    //     // `AmosGameVotes`,
    //     // `Response`,
    //     // `createTopic`,
    //   ],
    // },
  },
} |> makeExecutableSchema
  |> applyDirectives
  |> applyScalars
