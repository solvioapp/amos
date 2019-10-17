import {R, React} from 'common'

const multiSubmit = C => (props) => {

  const

  {form} = props,

  enhance = arr => (
    form.handleSubmit (input => {
      /* This isn't really necessary */
      // const variables = {input: (R.pick (fields) (input))}
      arr[0] ({variables: {input}})
    })
  ),
  onSubmit = R.map (enhance) (props.onSubmit),

  /* Override onSubmit */
  forwardProps = R.merge (props) ({onSubmit})

  return <C {...forwardProps} />
}

export default multiSubmit