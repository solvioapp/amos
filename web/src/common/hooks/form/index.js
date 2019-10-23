/* eslint-disable indent, max-lines */
import {R} from 'common'
import _form from './form'
import submit from './submit'
import multiSubmit from './multi-submit'

export const

form = (formOpts) => (opts) => (
  R.pipe (
    _form (formOpts) (opts),
    submit,
  )
),

multiForm = (formOpts) => (opts) => (
  R.pipe (
    _form (formOpts) (opts),
    multiSubmit
  )
)