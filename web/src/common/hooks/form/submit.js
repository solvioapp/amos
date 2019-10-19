import {R} from 'common'

const submit = (props) => {
  const

  {form} = props,

  [] = [form |> console.log ('form submit', #)],

  onSubmit = form.handleSubmit (input => {
    // const variables = {input: (R.pick (fields) (input))}
    props.onSubmit[0] ({variables: {input}})
  })

  /* Override onSubmit */
  return R.merge (props) ({onSubmit})
}

export default submit