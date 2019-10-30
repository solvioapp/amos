import {R, H, React, useForm, useFormContext} from 'common'

/* eslint-disable indent */
const formOnly =
  (formOpts) => (opts) =>
  (props) => {

  const

  {validationSchema: schema} = formOpts,
  {useContext, name, message} = opts,

  /* Get methods */
  /* eslint-disable no-shadow */
  form = useContext
    ? useFormContext (formOpts)
    : useForm (formOpts),

  // schemaFields = R.pipe (R.prop (`fields`), R.keys) (schema),

  // fields = H.isNotNilOrEmpty (schemaFields) && schemaFields || opts.fields,

  fields = R.keys (form.getValues()),

  [] = [form.getValues() |> console.log ('form.getValues()', #)],

  /* Merge form errors with API errors */
  errors = R.merge (form.errors) (props.onSubmit[1]?.data || {}),

  /* Merge default messages with errors */
  messages = H.getMessages (message (form.formState)) (errors)

  /* Conditionally add validate */
  return R.merge ({fields, messages, name, errors,
    form, schema}) (props)
}

export default formOnly