/* eslint-disable max-lines */
import {React, gql, R, CONST, useMutation, validation} from 'common'
import {multiForm} from '../form'
import times from './times'
import onClick from './on-click'
import isValid from './is-valid'
import results from './results'
import config from './config'
import hydrate from './hydrate'
import onSubmit from './on-submit'
import onChange from './on-change'

const

ADD_REVIEW_GQL = gql`
  mutation AddReview ($input: AddReviewInput!) {
    addOnSubmit (input: $input) {
      success
      message
    }
  }
`,

ADD_REVIEW = C => ({...rest}) => {
  const addOnSubmit = useMutation (ADD_REVIEW_GQL)

  return (
    <C addOnSubmit={addOnSubmit} onSubmit={addOnSubmit} {...rest}/>
  )
},

message = ({isSubmitted}) => (
  isSubmitted ? CONST.lets_go : CONST.signup
),

formOpts = name => ({
  ...(validation[name] && {validationSchema: validation[name]}),
  // mode: `onBlur`
}),

opts = name => ({
  // fields: [name],
  message,
})

export const

useReview = name => (
  R.pipe (
    onSubmit, // adds onSubmit
    /* Adds {fields, messages, form, schema}
      Overrides onSubmit */
    multiForm (formOpts (name)) (opts (name)),
    hydrate, // adds Review
  )
),

useReviewLinks = name => (
  R.pipe (
    useReview (name), // see above
    onChange, // adds onChange, valid
  )
),

useReviewTopics = name => (
  R.pipe (
    useReview (name),
    config, // adds config, onChange
    results, // adds results, loading
    /* Adds {valid, setOneValid, setValid}
      Overrides onChange, onSubmit */
    isValid,
    onClick, // adds onClick, onEnt
    times // adds times
  )
)