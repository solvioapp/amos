import {R, H} from 'common'

const

/**
 * @description adds onClick
 */
onClick = (props) => {
  const

  {form, setOneValid, onSubmit} = props,

  // onEnt = H.navto (`/t/${topic}`)
  onEnt = (field) => (key) => (t) => {
    console.log (`onEnt fired`)
    t === `SUBMIT`
      ? onSubmit.next()
      : do {
        const val = form.getValues (field)
        R.isEmpty (val[field])
          ? onSubmit.next
            ? onSubmit.next()
            : onSubmit.finish()
          : form.setValue (field, t) || setOneValid (key) (true)
      }
  }

  return R.merge ({onEnt}) (props)
}

export default onClick