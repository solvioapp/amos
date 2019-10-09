import {React, R, H, useForm} from 'common'

export const

useMount = mount => React.useEffect(
  mount, []
),

useUnmount = unmount => React.useEffect(
  () => () => {
    unmount && unmount()
  }, []
),

myUseForm = ({validationSchema, message}) => _Form => ({onSubmit: [_onSubmit, {data}]}) => {
  const

  /* Get resutls of useForm */
  res = useForm ({validationSchema}),

  fields = R.pipe (R.prop (`fields`), R.keys) (validationSchema),
  onSubmit = res.handleSubmit (input => {
    const variables = {input: (R.pick (fields) (input))}
    _onSubmit ({variables})
  }),

  errors = R.merge (res.errors) (data || {}),
  messages = H.getMessages (message (res.formState)) (errors),

  my = {onSubmit, errors, messages},
  props = R.merge (res) (my)

  return <_Form {...props} />
}