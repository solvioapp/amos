import {R} from 'common'

const multiSubmit = (props) => {

  const

  {form} = props,

  // filterErrors = arr => (
  //   form.handleSubmit (input => {

  //   })
  // ),

  enhance = arr => (
    form.handleSubmit (input => {
      /* This isn't really necessary */
      // const variables = {input: (R.pick (fields) (input))}
      arr[0] ({variables: {input}})
    })
  ),
  // onSubmit = {}
  onSubmit = R.map (enhance) (props.onSubmit)
  // onSubmit.previous = enhance (props.onSubmit.previous)
  // onSubmit.next = enhance (props.onSubmit.next)
  // onSubmit.finish = enhance (props.onSubmit.finish)

  // /* Override onSubmit */
  return R.merge (props) ({onSubmit})
  // return props
}

export default multiSubmit