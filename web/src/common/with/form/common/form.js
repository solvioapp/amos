import {R, H, React, useForm, useFormContext} from 'common'

/* eslint-disable indent */
const form =
  (formOpts) => (opts) =>
  C =>
  (props) => {

  const

  {validationSchema: schema} = formOpts,
  {useContext, message} = opts,

  /* Get methods */
  form = useContext
    ? useFormContext (formOpts)
    : useForm (formOpts),

  // schemaFields = R.pipe (R.prop (`fields`), R.keys) (schema),

  // fields = H.isNotNilOrEmpty (schemaFields) && schemaFields || opts.fields,

  fields = R.keys (form.getValues()),

  /* Merge form errors with API errors */
  errors = R.merge (form.errors) (props.onSubmit[1]?.data || {}),

  /* Merge default messages with errors */
  messages = H.getMessages (message (form.formState)) (errors),

  /* Conditionally add validate */
  forwardProps = R.merge ({fields, messages,
    form, schema}) (props)

  return <C {...forwardProps} />
}

export default form