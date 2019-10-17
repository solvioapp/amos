import {R, React} from 'common'

const submit = C => (props) => {
  const

  {form} = props,

  onSubmit = form.handleSubmit (input => {
    // const variables = {input: (R.pick (fields) (input))}
    props.onSubmit[0] ({variables: {input}})
  }),

  /* Override onSubmit */
  forwardProps = R.merge (props) ({onSubmit})

  return <C {...forwardProps} />
}

export default submit