/* eslint-disable max-lines */
import {React, gql, R, CONST, useMutation, validation} from 'common'
import {multiForm} from '../form'
import hydrateOnMount from './hydrate-on-mount'
import onClick from './on-click'
import onSubmit from './on-submit'
import results from './results'
import isValid from './is-valid'
import times from './times'

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
  ...({validationSchema: validation[name]}),
  // mode: `onBlur`
}),

opts = name => ({
  // fields: [name],
  message,
})

export const

withReview = name => (
  R.pipe (
    hydrateOnMount,
    multiForm (formOpts (name)) (opts (name)),
    onSubmit
  )
),

withReviewTopics = name => (
  R.pipe (
    times,
    onClick,
    isValid,
    results,
    withReview (name),
  )
)