import * as R from 'ramda'

export const

getMessages = def => R.pipe (
  R.values,
  R.pluck (`message`),
  R.flatten,
  R.when (
    R.isEmpty,
    R.append (def),
  )
)
