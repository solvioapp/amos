import {H, R} from 'common'

const submit = (props) => {
  const

  {form, input} = props,

  // [] = [form |> console.log ('form submit', #)],

  onSubmit = form.handleSubmit (_input => {
    // const variables = {input: (R.pick (fields) (input))}
    input |> console.log ('input', #)
    _input |> console.log ('_input', #)
    const variables = H.isNilOrEmpty (input)
      ? {input: _input}
      : {input: R.mergeDeepRight (_input) (input)}
    variables |> console.log ('variables', #)
    props.onSubmit[0] ({variables})
  })

  /* Override onSubmit */
  return R.merge (props) ({onSubmit})
}

export default submit