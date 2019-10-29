/* eslint-disable max-lines */
import {R, CONST, validation} from 'common'
import {multiForm} from '../form'
import times from './times'
import onClick from './on-click'
import isValid from './is-valid'
import results from './results'
import config from './config'
import loadReview from './load-review'
import hydrateTopics from './hydrate-topics'
import onSubmit from './on-submit'
import hydrateLinks from './hydrate-links'
import onEnt from './on-ent'

const

message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.signup
),

defaultValues = {
  link: {link: ``},
  topic: {topic: []},
  prerequisite: {prerequisite: []},
},

formOpts = name => ({
  ...(validation[name] && {validationSchema: validation[name]}),
  defaultValues: defaultValues[name],
  submitFocusError: false,
  // mode: `onBlur`
}),

opts = name => ({
  // fields: [name],
  name,
  message,
})

export const

useReview = name => (
  R.pipe (
    onSubmit, // adds onSubmit
    /* Adds {fields, messages, form, schema}
      Overrides onSubmit */
    multiForm (formOpts (name)) (opts (name)),
    loadReview, // loads Review
  )
),

useReviewLinks = name => (
  R.pipe (
    useReview (name), // see above
    hydrateLinks, // hydrates inputs with review
    onEnt // adds onEnt
  )
),

useReviewTopics = name => (
  R.pipe (
    useReview (name),
    hydrateTopics, // hydrates inputs with review
    config, // adds config, onChange
    results, // adds results, loading
    /* Adds {valid, setOneValid, setValid}
      Overrides onChange, onSubmit */
    isValid,
    onClick, // adds onClick
    onEnt, // adds onEnt
    times // adds times
  )
)

export {loadReview}