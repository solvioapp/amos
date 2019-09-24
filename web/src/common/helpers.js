import * as R from 'ramda'

export const isNotNil = R.complement (R.isNil)

export const mapIndexed = R.addIndex (R.map)
