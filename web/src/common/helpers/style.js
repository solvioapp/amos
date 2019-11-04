import {R, React, styled, css} from 'common'

export const

ifProp = (prop, a, b) => R.ifElse(
  R.propEq (prop) (true),
  R.always (a),
  R.always (b),
),

prop = (name, defValue) => R.ifElse (
  R.has (name),
  R.prop (name),
  R.always (defValue),
),

propEq = (name, a, b) => R.ifElse (
  R.propEq (name, a),
  R.always (a),
  R.always (b)
),

style = C => (css, attrs) => styled (C).attrs (attrs) `${css};`,

styleAndForwardRef = C => css => (
  style (React.forwardRef (C)) (css)
),

options = (obj, name) => props => obj[props[name]]

export {styled, css}