import {R} from 'common'
import {makeExecutableSchema} from 'apollo-server'
import applyDirectives from '../bootstrap/directives'
import applyScalars from '../bootstrap/scalars'
import typeDefs from './types'
import resolvers from './resolvers'
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
} |> makeExecutableSchema
  |> applyDirectives
  |> applyScalars
