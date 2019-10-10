import * as R from 'ramda'

export const

lens = R.ifElse(
  R.is(String),
  R.lensProp,
  R.lensPath
),

set = R.curry((path, value, state) => R.set(lens(path), value, state)),

ifProp = (prop, a, b) => R.ifElse(
  R.propEq(prop, true),
  R.always(a),
  R.always(b),
),

prop = (name, defValue) => R.ifElse(
  R.has(name),
  R.prop(name),
  R.always(defValue),
),

/**
 * @description Tests whether function is not `null` or `undefined`
 * @param val
 */

notEquals = R.complement (R.equals),

isNotNil = R.complement (R.isNil),
isNotEmpty = R.complement (R.isEmpty),

isNotNilOrEmpty = R.both (isNotNil, isNotEmpty),

/**
 * @description Like R.map but you get (val, key)!
 * @param cb
 * @param obj
 */
mapIndexed = R.addIndex (R.map),

/**
 * @description Apply two functions and return result of second one
 * @param Arb Arbitrary number of params
 */

applyAndReturn = fn1 => fn2 => R.converge (R.prop (`1`)) ([fn1, fn2]),

/**
 * @description Wrap any function with debug to log its arguments
 * @param Arb Arbitrary number of params
 */
debug = applyAndReturn (console.log),

log = items => {
  console.log (`H.log`, items)
  return items
},

mapIfNotNil = fn => obj => (
  R.isNil (obj)
    ? null
    : R.map (fn) (obj)
),

getMessages = def => R.pipe (
  R.values,
  R.pluck (`message`),
  R.flatten,
  R.when (
    R.isEmpty,
    R.append (def),
  )
)