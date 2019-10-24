import {R, H, React, useForm, useFormContext} from 'common'

/* eslint-disable indent */
const form =
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

  // [] = [fields |> console.log ('fields', #)],

  /* Merge form errors with API errors */
  errors = R.merge (form.errors) (props.onSubmit[1]?.data || {}),
  // [] = [form  |> console.log ('form form.js', #)],

  /* Merge default messages with errors */
  messages = H.getMessages (message (form.formState)) (errors)

  /* Conditionally add validate */
  return R.merge ({fields, messages, name,
    form, schema}) (props)
}

export default form