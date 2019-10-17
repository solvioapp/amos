import {R, styled} from 'common'

export const

ifProp = (prop, a, b) => R.ifElse(
  R.propEq (prop) (true),
  R.always (a),
  R.always (b),
),

prop = (name, defValue) => R.ifElse(
  R.has (name),
  R.prop (name),
  R.always (defValue),
),

style = C => css => styled (C) `${css};`