import * as R from 'ramda'

export const

/**
 * @description Apply two functions and return result of the second
 * @param Arb Arbitrary number of params
 */

intercept = cb => fn => R.converge (R.nthArg (0)) ([fn, cb]),

/**
 * @description Wrap any function with debug to log its arguments
 * @param Arb Arbitrary number of params
 */
debug = intercept (console.log),
safeMap = fn => obj => (
  R.isNil (obj)
    ? null
    : map (fn) (obj)
),

getMessages = def => R.pipe (
  R.values,
  R.pluck (`message`),
  R.flatten,
  R.when (
    R.isEmpty,
    R.append (def),
  )
),

importContext = req => (
  R.reduce ((acc, key) => {
    const name = key
      /* Get file name */
      |> R.split (`/`) (#) |> R.last
      /* Drop extension */
      |> R.split (`.`) (#) |> R.head
    const _exports = req (key)
    const exportsMerged = R.merge (R.omit ([`default`]) (_exports)) (acc)
    const defaultExport = R.has (`default`) (_exports)
      ? {[name]: _exports.default}
      : {}
    return R.merge (defaultExport) (exportsMerged)
  }) ({}) (req.keys())
),

reduce = R.addIndex (R.reduce),

atleast = min => val => val < min ? min : val,

/**
 * @description Ramda's `update` doesn't work if the index doesn't exist
 */
update = R.curry((idx, val, arr) => {
  const _arr = [...arr]
  _arr[idx] = val
  return _arr
}),

collapse = val => {
  // val |> console.log ('val', #)
  return R.cond ([
    [R.is (Object), x => do {console.log(`x`, x); R.all (collapse)}],
    [R.T, isNotNilOrEmpty]
  ]) (val)
},

hasLength = length => R.pipe (R.length, R.equals (length))

// const col = R.filter (collapse) ({input: {topic: ['', '', '']}})

// col |> console.log ('col', #)