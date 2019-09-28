import * as R from 'ramda'

/**
 * @description Tests whether function is not `null` or `undefined`
 * @param val
 */
export const isNotNil = R.complement (R.isNil)

/**
 * @description Like R.map but you get (val, key)!
 * @param cb
 * @param obj
 */
export const mapIndexed = R.addIndex (R.map)

/**
 * @description Apply two functions and return result of second one
 * @param Arb Arbitrary number of params
 */

export const applyAndReturn = fn1 => fn2 => R.converge (R.prop (`1`)) ([fn1, fn2])

/**
 * @description Wrap any function with debug to log its arguments
 * @param Arb Arbitrary number of params
 */
export const debug = applyAndReturn (console.log)
