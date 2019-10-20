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

useReview = name => (
  R.pipe (
    onSubmit,
    multiForm (formOpts (name)) (opts (name)),
    hydrate
  )
),

useReviewTopics = name => (
  R.pipe (
    useReview (name),
    config,
    results,
    isValid,
    onClick,
    times
  )
)