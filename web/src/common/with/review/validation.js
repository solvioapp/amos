import {R, React, CONST} from 'common'

const addValidation = C => (props) => {

  const

  {topic, results, loading, form, fields} = props,

  isValid = (!loading) && (R.length (results) === 1) && (topic === results[0].text),

  setError = () => form.setError (fields[0], ``, CONST.err_topics),

  [] = [form.formState.isSubmitted && (() => {
    isValid
      ? R.not (form.formState.isValid) && form.clearError ()
      : setError()
  })()],

  _addValidation = cb => (
    isValid
      ? cb
      : form.handleSubmit (setError)
  ),

  onSubmit = R.map (_addValidation) (props.onSubmit),

  /* Override onSubmit */
  forwardProps = R.mergeAll ([{isValid}, props, {onSubmit}])

  return <C {...forwardProps} />
}

export default addValidation