import * as R from 'ramda'
import fs from 'fs'
import path from 'path'

export const 
neq = R.complement (R.equals),

read = dir => file => fs.readFileSync (path.join (dir, file), {encoding: `utf8`}),

mergeDeepAll = R.reduce (R.mergeDeepRight) ({}),

/**
 * @description 
 * @example 
 */
assert = pr => st => {
  pr
    ? null
    : throw new Error(`ERROR: ${st}.`)
},

isNotEmpty = R.complement(R.isEmpty),

isNotNil = R.complement(R.isNil),

/**
 * @description Turns an array of named functions to object with keys corresponding to those names
 * @param {Array} - array of fns
 */
arrayOfFnsToObject = R.reduce ((acc, val) => R.set (R.lensProp (val.name)) (val) (acc)) ({}),
importRegex = (dir = `.`, useSubdirs = true, regex = /^\.\/.*$/, mode = `sync`) => {
  const req = require.context(dir, useSubdirs, regex, mode)
  const cache = {}
  const importAll = req => {
    req.keys().forEach(key => cache[key] = req(key))
  }
  importAll(req)
  return cache
},

// mergeDeepWithKeyAll = 

id = R.identity,

log = p => {console.log(`p`, p); return p},

ls = rec => dirBase => dir => regExp => R.map (R.pipe (
  f => dir + `/` + f,
  relPath => fs.lstatSync (path.join (dirBase, relPath)).isDirectory() ? ls (rec) (dirBase) (relPath) (regExp) : R.test (regExp) (relPath) ? relPath : null
)) (fs.readdirSync (path.join (dirBase, dir)))
|> R.flatten
|> R.reject (R.isNil) (#),

requireContext = dirAbs => key => require (path.resolve (dirAbs, key)),

req = dirBase => dirRel => regExp => requireAlso => {
  const

  dirAbs = path.resolve (dirBase, dirRel),
  keys = ls (true) (dirAbs) (`.`) (regExp)

  return !requireAlso ? keys : (() => {
    const cache = R.map (requireContext (dirAbs)) (keys)
    /* Accept default exports */
    return R.map (val => R.propOr (val) (`default`) (val)) (cache)
  })()
}

// getOne = async (cypher, _, params, {session}) => {
//   const {records: recs} = await session.run (cypher, params)

//   const toReturn = R.nth (0) (R.map (rec => rec.get (`t`).properties) (recs))
//   toReturn |> console.log ('toReturn', #)
//   return toReturn
// }