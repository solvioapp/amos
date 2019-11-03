import {R} from 'common'

export const

/**
 * @description Universal lens
 * @param path
 * @param obj
 */
lens = R.cond ([
  [R.is (String), R.lensProp],
  [R.is (Number), R.lensIndex],
  [R.T, R.lensPath]
]),

set = R.curry ((path, val, obj) => R.set (lens (path, obj), val, obj)),

over = R.curry ((path, cb, obj) => R.over (lens (path, obj), cb, obj)),

/**
 * @description Tests whether function is not `null` or `undefined`
 * @param val
 */

neq = R.complement (R.equals),

isNotNil = R.complement (R.isNil),
isNotEmpty = R.complement (R.isEmpty),

isNilOrEmpty = R.either (R.isNil) (R.isEmpty),
isNotNilOrEmpty = R.both (isNotNil, isNotEmpty),


/**
 * @description Like R.map but you get (val, key)!
 * @param cb
 * @param obj
 */
map = R.addIndex (R.map)