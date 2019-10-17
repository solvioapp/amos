/* eslint-disable indent, max-lines */
import {R} from 'common'
import C from './common'
import submit from './submit'
import multiSubmit from './multi-submit'

export const

form = (formOpts) => (opts) => (
  R.pipe (
    submit,
    C.form (formOpts) (opts)
  )
),

multiForm = (formOpts) => (opts) => (
  R.pipe (
    multiSubmit,
    C.form (formOpts) (opts)
  )
)