import {R, H, React, CONST} from 'common'

const VALIDATE = [`next`, `finish`]
const DONT_VALIDATE = [`previous`]

const setErrors = form => fields => () => R.map (field => form.setError (field, ``, CONST.err_topics)) (fields)

const isValid = C => (props) => {

  const

  {topics, results, loading, form, fields} = props,
  createIsValid = (result, topic) => R.or (H.isNilOrEmpty (result)) (
    // (!loading) && (R.length (result) === 1) && (topic === result[0].text)
    (!loading) && (R.includes (topic) (R.pluck (`text`) (result)))
  ),

  /* eslint-disable no-shadow */
  [] = [topics |> console.log ('topics', #)],
  isValid = R.zipWith (createIsValid) (results.topics) (topics),

  [] = [isValid |> console.log ('isValid', #)],

  // TODO: generalize
  invalidFields = H.reduce ((acc, _, i) => R.append (`topic[${i}]`) (acc)) ([]) (isValid),
  // isAllValid = R.all (R.identity) (isValid),
  isAllValid = R.length (invalidFields) === 0,

  [] = [form.formState.isSubmitted && (() => {
    isAllValid
      ? R.not (form.formState.isValid) && form.clearError ()
      : setErrors (form) (invalidFields)
  })()],

  _addValidation = cb => (
    isAllValid
      ? cb
      : form.handleSubmit (setErrors (form) (invalidFields))
  ),

  // validate = R.pipe (
  //   R.pick (VALIDATE),
  //   R.map 
  // ) (props.onSubmit)
  
  // onSubmit = R.merge (validate) (dontValidate)

  // onSubmit = R.converge (
  //   R.merge,
  //   [R.pipe , ]
  // )

  onSubmit = R.map (_addValidation) (props.onSubmit),

  /* Override onSubmit */
  forwardProps = R.mergeAll ([{isValid}, props, {onSubmit}])

  return <C {...forwardProps} />
}

export default isValid